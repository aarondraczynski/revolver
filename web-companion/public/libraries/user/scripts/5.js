if (msgs[i].innerHTML.match(/<a [^>]*class="image youtube_video"[^>]*>/)) {
  var url = msgs[i].querySelector('a');
  url = url.href;

  var regex = /^(http|https):\/\/(www.)?(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/,
      match = url.match(regex);

  if (match != null) {
    var video = match[7];

    var request = new XMLHttpRequest;
    request.open('GET', 'https://gdata.youtube.com/feeds/api/videos/' + video + '?v=2&alt=json', false);
    request.onload = function() {
      var response = JSON.parse(this.response),
          title = response.entry.title.$t,
          thumbnail = response.entry.media$group.media$thumbnail[2].url,
          duration = response.entry.media$group.yt$duration.seconds,
          views = response.entry.yt$statistics.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          hasRatings = false;

      if (typeof response.entry.yt$rating !== 'undefined') {
        hasRatings = true;
        var likes = response.entry.yt$rating.numLikes.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            dislikes = response.entry.yt$rating.numDislikes.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      var minutes = parseInt(duration / 60) % 60,
          seconds = duration % 60;

      msgs[i].innerHTML = '';

      var link = document.createElement('a');
      link.href = 'http://www.youtube.com/watch?v=' + video;
      link.className = 'link clearfix';
      link.target = '_blank';
      link.setAttribute('style', 'display:block;position:relative;clear:both;width:300px;padding:15px;margin:8px;background:#fff;border-radius:3px;box-shadow:0 0 7px rgba(0,0,0,.18);text-decoration:none');

      link.innerHTML += '<img src="' + thumbnail + '" width="300" height="225" style="margin:0 0 11px" />';
      link.innerHTML += '<h3 style="padding:0;margin:0 0 10px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:20px;font-weight:200;color:#f83a40;line-height:24px">' + title + '</h3>';

      if (hasRatings) {
        link.innerHTML += '<p style="padding:0;margin:0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">Views: ' + views + ' &mdash; ' + likes + ' likes, ' + dislikes + ' dislikes';
      } else {
        link.innerHTML += '<p style="padding:0;margin:0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">Views: ' + views + '</p>';
      }

      if (minutes > 0) {
        link.innerHTML += '<p style="padding:0;margin:0 0 12px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">Duration: ' + minutes + ' min ' + seconds + ' sec</p>';
      } else {
        link.innerHTML += '<p style="padding:0;margin:0 0 12px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">Duration: ' + duration + ' sec</p>';
      }

      link.innerHTML += '<img style="float:right;margin:1px 0 0" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAMCAYAAAA6cw7iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQAxMC8yLzEzhTMxkwAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAANiSURBVEiJxdZdqJZFEAfwn1YUJ9FIusjoHGKiD7AMjMyswIpMEiv0GKGRXYYXSWYQkn0hld5YGKgh9mUSSaFS9okG0sdFWBZp5FRaKShRRolxDLp45s3Xt3OigkMDyzw7u/uf/+zM7j5DMrMHXY6VQxGx2/8gmbkcp2J1RGwaLD9DsRafd7RvMvP7zLxzsBz/jUxGL84ZTCdD274PYk+1XzAKSzNz5mAS+L/k+LbvVRExDzKzC29jPG7Fmsw8AYs0GRmOT/FoRGzNzNOwvnAWRMTmwpmHafgiIm4v2xzMxBk4gA14JCL6Osll5kJc17G+C68X9wURsTkzJ2IeLsDP2Ij7I6IvM2dgbvlajsVYOrTTGUTEIWyr7vDS72A+RqMb12NTZo6LiAP4rTaqvUJml21XkV6NZWXrxlg8iHdrYzvl/Zo7KzNHla0XVyCwNTOn4s3i01387sWamn96YUzAczU+rD3wMzNzarU5uLns2zLztnK2H5fiZLyMYbiv5j1fenIFeWE5OYyVRXA2jmBuRAzBrBofj7s6o46It7BTk91byjy19LqqkkU1vqJ4XVWYvZk5rg1uZOkl2NweeK+mXNdrsjISXxbwNTXnW8zAw5oMw+Wln62NGZWZkyso2FgVcVP1t0TE4xXYGrxS9paPTmlt6A1V5tdWf1m9SKOr/3vxmoJ9ZZvUgdUbEfdExPb2wPdoSmt/9b/GRRGxFyeW7VxMrzah1hysIPqwruZNU5nHU6VbGK0Na8mPHeOdstLRqrhDU2VbImKHY5/hG9u4HVfc2mV/6+7h2Ft9XURcpsnUEZxVjuCT0t9hTET04GIsrO+WrCg9XZOJnVWu8FHpqzNzLNS5nVL2D/qLuqrlNU05H3OsKvgfyrY4InqKz3xcGREPtUEdbsf9y+VWRFdW94HMPB9PairgPOzKzPfwFZ6u899au11TNSPK9FIb9BP4DCdpLqUPNf8M3YW9pL/AS54pPaICXds21lq3NDM/zswdeBHrB7gw+w+8ZG6RHIZV+FVztt4o5+M1GViFFwYgeVjzfODPozDJ0c24RHMZvYqJldl+JSI2aO4bmso81Db2GO7GXozRJGcn5vf3RLZkyEADA0lmnqJ5Ina3E/iXGF3owb6I+Om/YAyAezb6/snv9h8iFTWyfzLAiAAAAABJRU5ErkJggg==" />';
      link.innerHTML += '<p style="padding:0;margin:0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;color:#666;line-height:16px">&#9654; YouTube</p>';

      msgs[i].appendChild(link);

    };
    request.send();

  }
}