function hasClass(elem,name){return(new RegExp("(\s|^)"+name+"(\s|$)")).test(elem.className)}function addClass(elem,name){if(!hasClass(elem,name))elem.className+=(elem.className?" ":"")+name}function removeClass(elem,name){if(hasClass(elem,name))elem.className=elem.className.replace(new RegExp("(\s|^)"+name+"(\s|$)")," ").replace(/^\s+|\s+$/g,"")}var Showdown={};
Showdown.converter=function(){this.makeHtml=function(text){text=_DoItalicsAndBold(text);return text};var _DoItalicsAndBold=function(text){text=text.replace(/&lt;brooklynkid&gt;(.*?)&lt;\/brooklynkid&gt;/,'<strong style="font-family: Brooklyn Kid, BrooklynKid, sans-serif; font-size: 25px; font-weight: normal; color: navy">$1</strong>');text=text.replace(/&lt;cooper&gt;(.*?)&lt;\/cooper&gt;/,'<strong style="font-family: Cooper Black, sans-serif; font-size: 30px; font-weight: normal">$1</strong>');text=
text.replace(/&lt;courier&gt;(.*?)&lt;\/courier&gt;/,'<strong style="font-family: Courier New, Courier, sans-serif; font-size: 18px; font-weight: normal">$1</strong>');text=text.replace(/&lt;comicsans&gt;(.*?)&lt;\/comicsans&gt;/,'<strong style="font-family: Comic Sans MS, Comic Sans, sans-serif; font-size: 18px; font-weight: normal; color: purple">$1</strong>');text=text.replace(/&lt;impact&gt;(.*?)&lt;\/impact&gt;/,'<strong style="font-family: Impact, sans-serif; font-size: 20px; font-weight: normal; text-transform: uppercase">$1</strong>');
text=text.replace(/&lt;papyrus&gt;(.*?)&lt;\/papyrus&gt;/,'<strong style="font-family: Papyrus, sans-serif; font-size: 20px; font-weight: normal; color: #35bc4b">$1</strong>');text=text.replace(/&lt;giantest&gt;(.*?)&lt;\/giantest&gt;/,'<strong style="font-size: 180px; font-weight: normal">$1</strong>');text=text.replace(/&lt;gianter&gt;(.*?)&lt;\/gianter&gt;/,'<strong style="font-size: 110px; font-weight: normal">$1</strong>');text=text.replace(/&lt;giant&gt;(.*?)&lt;\/giant&gt;/,'<strong style="font-size: 60px; font-weight: normal">$1</strong>');
text=text.replace(/&lt;tiny&gt;(.*?)&lt;\/tiny&gt;/,'<strong style="font-size: 4px; font-weight: normal">$1</strong>');text=text.replace(/&lt;red&gt;(.*?)&lt;\/red&gt;/,'<strong style="font-weight: normal; color: red">$1</strong>');text=text.replace(/&lt;blue&gt;(.*?)&lt;\/blue&gt;/,'<strong style="font-weight: normal; color: blue">$1</strong>');text=text.replace(/&lt;green&gt;(.*?)&lt;\/green&gt;/,'<strong style="font-weight: normal; color: green">$1</strong>');text=text.replace(/&lt;spoilers&gt;(.*?)&lt;\/spoilers&gt;/,
'Spoiler: <strong class="spoiler" style="padding: 4px 3px; background: #444; font-weight: normal; color: #444; user-select: none; -webkit-user-select: none">$1</strong>');text=text.replace(/&lt;spoiler&gt;(.*?)&lt;\/spoiler&gt;/,'Spoiler: <strong class="spoiler" style="padding: 4px 3px; background: #444; font-weight: normal; color: #444; user-select: none; -webkit-user-select: none">$1</strong>');text=text.replace(/&lt;marquee&gt;(.*?)&lt;\/marquee&gt;/,"<marquee>$1</marquee>");text=text.replace(/&lt;strike&gt;(.*?)&lt;\/strike&gt;/,
"<strike>$1</strike>");text=text.replace(/&lt;del&gt;(.*?)&lt;\/del&gt;/,"<strike>$1</strike>");text=text.replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/,"<strong>$1</strong>");text=text.replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/,"<strong>$1</strong>");text=text.replace(/&lt;em&gt;(.*?)&lt;\/em&gt;/,"<em>$1</em>");text=text.replace(/&lt;i&gt;(.*?)&lt;\/i&gt;/,"<em>$1</em>");return text}};var msgs=document.querySelectorAll('.text_message div.body,.tweet_message div.body');for(var i=0;i<msgs.length;i++){if(!msgs[i].hasAttribute('data-parsed')&&!msgs[i].hasAttribute('data-iftl')){var old=msgs[i].innerHTML;if (msgs[i].innerHTML.match(/^\/link/)) {
  var link = msgs[i].querySelector('a');
  if (link !== null) {
    var request = new XMLHttpRequest,
        url = link.getAttribute('href');
    request.open('GET', 'http://logansbailey.com/ogp/?q=' + encodeURI(url), false);
    request.onload = function() {
      var response = JSON.parse(this.response);

      msgs[i].innerHTML = '';

      var link = document.createElement('a');
      link.href = response.url;
      link.className = 'link clearfix';
      link.target = '_blank';
      link.setAttribute('style', 'display:block;position:relative;clear:both;width:450px;padding:15px;margin:8px;background:#fff;border-radius:3px;box-shadow:0 0 7px rgba(0,0,0,.18);text-decoration:none');

      if (response.image.length > 0) {
        link.innerHTML += '<img src="' + response.image + '" width="50" height="50" style="position:absolute" />';
      }
      if (response.title.length > 0) {
        if (response.image.length > 0) {
          link.innerHTML += '<h3 style="padding:0;margin:-1px 0 10px 64px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:24px;font-weight:200;color:#08b4dd;line-height:27px">' + response.title + '</h3>';
        } else {
          link.innerHTML += '<h3 style="padding:0;margin:-1px 0 10px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:24px;font-weight:200;color:#08b4dd;line-height:27px">' + response.title + '</h3>';
        }
      }
      if (response.description.length > 0) {
        var description = response.description;
        if (description.length > 300) {
          description = description.substr(0, 300);
          description = description.substr(0, Math.min(description.length, description.lastIndexOf(' '))) + '&hellip;';
        }
        if (response.image.length > 0) {
          link.innerHTML += '<p style="padding:0;margin:0 0 8px 64px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">' + description + '</p>';
        } else {
          link.innerHTML += '<p style="padding:0;margin:0 0 8px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">' + description + '</p>';
        }
      }
      link.innerHTML += '<img style="float:right;margin:1px 0 0" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAMCAYAAAA6cw7iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQAxMC8yLzEzhTMxkwAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAANiSURBVEiJxdZdqJZFEAfwn1YUJ9FIusjoHGKiD7AMjMyswIpMEiv0GKGRXYYXSWYQkn0hld5YGKgh9mUSSaFS9okG0sdFWBZp5FRaKShRRolxDLp45s3Xt3OigkMDyzw7u/uf/+zM7j5DMrMHXY6VQxGx2/8gmbkcp2J1RGwaLD9DsRafd7RvMvP7zLxzsBz/jUxGL84ZTCdD274PYk+1XzAKSzNz5mAS+L/k+LbvVRExDzKzC29jPG7Fmsw8AYs0GRmOT/FoRGzNzNOwvnAWRMTmwpmHafgiIm4v2xzMxBk4gA14JCL6Osll5kJc17G+C68X9wURsTkzJ2IeLsDP2Ij7I6IvM2dgbvlajsVYOrTTGUTEIWyr7vDS72A+RqMb12NTZo6LiAP4rTaqvUJml21XkV6NZWXrxlg8iHdrYzvl/Zo7KzNHla0XVyCwNTOn4s3i01387sWamn96YUzAczU+rD3wMzNzarU5uLns2zLztnK2H5fiZLyMYbiv5j1fenIFeWE5OYyVRXA2jmBuRAzBrBofj7s6o46It7BTk91byjy19LqqkkU1vqJ4XVWYvZk5rg1uZOkl2NweeK+mXNdrsjISXxbwNTXnW8zAw5oMw+Wln62NGZWZkyso2FgVcVP1t0TE4xXYGrxS9paPTmlt6A1V5tdWf1m9SKOr/3vxmoJ9ZZvUgdUbEfdExPb2wPdoSmt/9b/GRRGxFyeW7VxMrzah1hysIPqwruZNU5nHU6VbGK0Na8mPHeOdstLRqrhDU2VbImKHY5/hG9u4HVfc2mV/6+7h2Ft9XURcpsnUEZxVjuCT0t9hTET04GIsrO+WrCg9XZOJnVWu8FHpqzNzLNS5nVL2D/qLuqrlNU05H3OsKvgfyrY4InqKz3xcGREPtUEdbsf9y+VWRFdW94HMPB9PairgPOzKzPfwFZ6u899au11TNSPK9FIb9BP4DCdpLqUPNf8M3YW9pL/AS54pPaICXds21lq3NDM/zswdeBHrB7gw+w+8ZG6RHIZV+FVztt4o5+M1GViFFwYgeVjzfODPozDJ0c24RHMZvYqJldl+JSI2aO4bmso81Db2GO7GXozRJGcn5vf3RLZkyEADA0lmnqJ5Ina3E/iXGF3owb6I+Om/YAyAezb6/snv9h8iFTWyfzLAiAAAAABJRU5ErkJggg==" />';
      if (response.site_name.length > 0) {
        if (response.image.length > 0) {
          link.innerHTML += '<p style="padding:0;margin:0 0 0 64px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;color:#666;line-height:16px">via ' + response.site_name + '</p>';
        } else {
          link.innerHTML += '<p style="padding:0;margin:0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;color:#666;line-height:16px">via ' + response.site_name + '</p>';
        }
      }
      msgs[i].appendChild(link);

    };
    request.onerror = function() {
      msgs[i].innerHTML = old.replace(/^\/link/, '');
    };
    request.send();
  }
}if (msgs[i].innerHTML.match(/^spotify:track:/)) {

  var input = msgs[i].innerHTML,
      parts = input.match(/spotify\:track\:(.+)/);

  if (parts.length !== 2) {
    msgs[i].innerHTML = input;
  } else {
    var song_id = parts[1],
        url = "http://logansbailey.com/ogp/?q=" + encodeURI("http://open.spotify.com/track/") + song_id,
        request = new XMLHttpRequest;

    request.open('GET', url, false);
    request.onload = function() {
      var response = this.response;
 
      if (!response || !JSON.parse(this.response)) {
        response = {description: 'Unknown track on Spotify.'};
      } else {
        response = JSON.parse(this.response);
      }

      msgs[i].innerHTML = '';

      var link = document.createElement('a');
      link.href = "spotify://track:" + song_id;
      link.className = 'spotify clearfix';
      link.target = '_blank';
      link.setAttribute('style', 'display:block;position:relative;clear:both;width:450px;padding:15px;margin:8px;background:#fff;border-radius:3px;box-shadow:0 0 6px rgba(0,0,0,.18);text-decoration:none');

      if (response.image.length > 0) {
        link.innerHTML += '<img src="' + response.image + '" width="78" height="78" style="position:absolute" />';
      }
      if (response.title.length > 0) {
        if (response.image.length > 0) {
          link.innerHTML += '<h3 style="padding:0;margin:-1px 0 10px 92px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:24px;font-weight:200;color:#83c506;line-height:27px">' + response.title + '</h3>';
        } else {
          link.innerHTML += '<h3 style="padding:0;margin:-1px 0 10px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:24px;font-weight:200;color:#83c506;line-height:27px">' + response.title + '</h3>';
        }
      }
      if (response.description.length > 0) {
        if (response.image.length > 0) {
          link.innerHTML += '<p style="padding:0;margin:0 0 8px 92px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">' + response.description + '</p>';
        } else {
          link.innerHTML += '<p style="padding:0;margin:0 0 8px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">' + response.description + '</p>';
        }
      }
      link.innerHTML += '<img style="float:right;margin:1px 0 0" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAMCAYAAAA6cw7iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQAxMC8yLzEzhTMxkwAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAANiSURBVEiJxdZdqJZFEAfwn1YUJ9FIusjoHGKiD7AMjMyswIpMEiv0GKGRXYYXSWYQkn0hld5YGKgh9mUSSaFS9okG0sdFWBZp5FRaKShRRolxDLp45s3Xt3OigkMDyzw7u/uf/+zM7j5DMrMHXY6VQxGx2/8gmbkcp2J1RGwaLD9DsRafd7RvMvP7zLxzsBz/jUxGL84ZTCdD274PYk+1XzAKSzNz5mAS+L/k+LbvVRExDzKzC29jPG7Fmsw8AYs0GRmOT/FoRGzNzNOwvnAWRMTmwpmHafgiIm4v2xzMxBk4gA14JCL6Osll5kJc17G+C68X9wURsTkzJ2IeLsDP2Ij7I6IvM2dgbvlajsVYOrTTGUTEIWyr7vDS72A+RqMb12NTZo6LiAP4rTaqvUJml21XkV6NZWXrxlg8iHdrYzvl/Zo7KzNHla0XVyCwNTOn4s3i01387sWamn96YUzAczU+rD3wMzNzarU5uLns2zLztnK2H5fiZLyMYbiv5j1fenIFeWE5OYyVRXA2jmBuRAzBrBofj7s6o46It7BTk91byjy19LqqkkU1vqJ4XVWYvZk5rg1uZOkl2NweeK+mXNdrsjISXxbwNTXnW8zAw5oMw+Wln62NGZWZkyso2FgVcVP1t0TE4xXYGrxS9paPTmlt6A1V5tdWf1m9SKOr/3vxmoJ9ZZvUgdUbEfdExPb2wPdoSmt/9b/GRRGxFyeW7VxMrzah1hysIPqwruZNU5nHU6VbGK0Na8mPHeOdstLRqrhDU2VbImKHY5/hG9u4HVfc2mV/6+7h2Ft9XURcpsnUEZxVjuCT0t9hTET04GIsrO+WrCg9XZOJnVWu8FHpqzNzLNS5nVL2D/qLuqrlNU05H3OsKvgfyrY4InqKz3xcGREPtUEdbsf9y+VWRFdW94HMPB9PairgPOzKzPfwFZ6u899au11TNSPK9FIb9BP4DCdpLqUPNf8M3YW9pL/AS54pPaICXds21lq3NDM/zswdeBHrB7gw+w+8ZG6RHIZV+FVztt4o5+M1GViFFwYgeVjzfODPozDJ0c24RHMZvYqJldl+JSI2aO4bmso81Db2GO7GXozRJGcn5vf3RLZkyEADA0lmnqJ5Ina3E/iXGF3owb6I+Om/YAyAezb6/snv9h8iFTWyfzLAiAAAAABJRU5ErkJggg==" />';
      if (response.site_name.length > 0) {
        if (response.image.length > 0) {
          link.innerHTML += '<p style="padding:0;margin:0 0 0 92px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;color:#666;line-height:16px">&#9654; Open in ' + response.site_name + '</p>';
        } else {
          link.innerHTML += '<p style="padding:0;margin:0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;color:#666;line-height:16px">&#9654; Open in ' + response.site_name + '</p>';
        }
      }
      msgs[i].appendChild(link);
    };
    request.onerror = function() {
      msgs[i].innerHTML = "Error retrieving Spotify data.";
    };
    request.send();

  }
}

if (msgs[i].innerHTML.match(/^dj:track:/)) {

  var input = msgs[i].innerHTML,
      parts = input.match(/dj\:track\:(.+)/);

  if (parts.length !== 2) {
    msgs[i].innerHTML = input;
  } else {
    var song_id = parts[1],
        url = "http://logansbailey.com/ogp/?q=" + encodeURI("http://open.spotify.com/track/") + song_id,
        request = new XMLHttpRequest;

    request.open('GET', url, false);
    request.onload = function() {
      var response = this.response;
 
      if (!response || !JSON.parse(this.response)) {
        response = {description: 'Unknown track on Spotify.'};
      } else {
        response = JSON.parse(this.response);
      }

      msgs[i].innerHTML = '';

      var link = document.createElement('a');
      link.href = "spotify://track:" + song_id;
      link.className = 'spotify clearfix';
      link.target = '_blank';
      link.setAttribute('style', 'display:block;position:relative;clear:both;width:450px;padding:15px;margin:8px;background:#fff;border-radius:3px;box-shadow:0 0 7px rgba(0,0,0,.18);text-decoration:none');

      if (response.image.length > 0) {
        link.innerHTML += '<img src="' + response.image + '" width="78" height="78" style="position:absolute" />';
      }
      if (response.title.length > 0) {
        if (response.image.length > 0) {
          link.innerHTML += '<h3 style="padding:0;margin:-1px 0 10px 92px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:24px;font-weight:200;color:#83c506;line-height:27px">' + response.title + '</h3>';
        } else {
          link.innerHTML += '<h3 style="padding:0;margin:-1px 0 10px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:24px;font-weight:200;color:#83c506;line-height:27px">' + response.title + '</h3>';
        }
      }
      if (response.description.length > 0) {
        if (response.image.length > 0) {
          link.innerHTML += '<p style="padding:0;margin:0 0 8px 92px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">' + response.description + '</p>';
        } else {
          link.innerHTML += '<p style="padding:0;margin:0 0 8px 0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:13px;font-weight:400;color:#999;line-height:18px">' + response.description + '</p>';
        }
      }
      link.innerHTML += '<img style="float:right;margin:1px 0 0" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAMCAYAAAA6cw7iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABV0RVh0Q3JlYXRpb24gVGltZQAxMC8yLzEzhTMxkwAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAANiSURBVEiJxdZdqJZFEAfwn1YUJ9FIusjoHGKiD7AMjMyswIpMEiv0GKGRXYYXSWYQkn0hld5YGKgh9mUSSaFS9okG0sdFWBZp5FRaKShRRolxDLp45s3Xt3OigkMDyzw7u/uf/+zM7j5DMrMHXY6VQxGx2/8gmbkcp2J1RGwaLD9DsRafd7RvMvP7zLxzsBz/jUxGL84ZTCdD274PYk+1XzAKSzNz5mAS+L/k+LbvVRExDzKzC29jPG7Fmsw8AYs0GRmOT/FoRGzNzNOwvnAWRMTmwpmHafgiIm4v2xzMxBk4gA14JCL6Osll5kJc17G+C68X9wURsTkzJ2IeLsDP2Ij7I6IvM2dgbvlajsVYOrTTGUTEIWyr7vDS72A+RqMb12NTZo6LiAP4rTaqvUJml21XkV6NZWXrxlg8iHdrYzvl/Zo7KzNHla0XVyCwNTOn4s3i01387sWamn96YUzAczU+rD3wMzNzarU5uLns2zLztnK2H5fiZLyMYbiv5j1fenIFeWE5OYyVRXA2jmBuRAzBrBofj7s6o46It7BTk91byjy19LqqkkU1vqJ4XVWYvZk5rg1uZOkl2NweeK+mXNdrsjISXxbwNTXnW8zAw5oMw+Wln62NGZWZkyso2FgVcVP1t0TE4xXYGrxS9paPTmlt6A1V5tdWf1m9SKOr/3vxmoJ9ZZvUgdUbEfdExPb2wPdoSmt/9b/GRRGxFyeW7VxMrzah1hysIPqwruZNU5nHU6VbGK0Na8mPHeOdstLRqrhDU2VbImKHY5/hG9u4HVfc2mV/6+7h2Ft9XURcpsnUEZxVjuCT0t9hTET04GIsrO+WrCg9XZOJnVWu8FHpqzNzLNS5nVL2D/qLuqrlNU05H3OsKvgfyrY4InqKz3xcGREPtUEdbsf9y+VWRFdW94HMPB9PairgPOzKzPfwFZ6u899au11TNSPK9FIb9BP4DCdpLqUPNf8M3YW9pL/AS54pPaICXds21lq3NDM/zswdeBHrB7gw+w+8ZG6RHIZV+FVztt4o5+M1GViFFwYgeVjzfODPozDJ0c24RHMZvYqJldl+JSI2aO4bmso81Db2GO7GXozRJGcn5vf3RLZkyEADA0lmnqJ5Ina3E/iXGF3owb6I+Om/YAyAezb6/snv9h8iFTWyfzLAiAAAAABJRU5ErkJggg==" />';
      if (response.site_name.length > 0) {
        if (response.image.length > 0) {
          link.innerHTML += '<p style="padding:0;margin:0 0 0 92px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;color:#666;line-height:16px">&#9654; Now Playing in ' + response.site_name + '</p>';
        } else {
          link.innerHTML += '<p style="padding:0;margin:0;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size:12px;font-weight:500;color:#666;line-height:16px">&#9654; Now Playing in ' + response.site_name + '</p>';
        }
      }
      msgs[i].appendChild(link);
      link.click();
    };
    request.onerror = function() {
      msgs[i].innerHTML = "Error retrieving Spotify data.";
    };
    request.send();

  }
}if (msgs[i].innerHTML.match(/^\/reactionfaces/)) {
  msgs[i].innerHTML = '<style type="text/css">.reaction-faces-list{list-style:none;width:500px;padding:0;margin:0}.reaction-faces-list li{float:left;width:250px;height:58px;font-size:11px;font-weight:bold;text-align:left}.reaction-faces-list img{margin:0 8px 4px 0;vertical-align:middle}</style><ul class="reaction-faces-list"><li><img src="http://i.imgur.com/BALjlSS.png" width="50" height="50" />:fffuuu:</li><li><img src="http://i.imgur.com/QPOk2cC.png" width="50" height="50" />:fffuuutears:</li><li><img src="http://i.imgur.com/lQJIB4D.png" width="50" height="50" />:joy:</li><li><img src="http://i.imgur.com/DTZAAki.png" width="50" height="50" />:happy:</li><li><img src="http://i.imgur.com/ItEWEGQ.png" width="50" height="50" />:wat:</li><li><img src="http://i.imgur.com/Sm7FxxZ.png" width="50" height="50" />:why:</li><li><img src="http://i.imgur.com/18M2A9t.png" width="50" height="50" />:okay:</li><li><img src="http://i.imgur.com/ePcg4eO.png" width="50" height="50" />:sad:</li><li><img src="http://i.imgur.com/7xwztYz.png" width="50" height="50" />:lol:</li><li><img src="http://i.imgur.com/4iHEint.png" width="50" height="50" />:pokerface:</li><li><img src="http://i.imgur.com/8mjPZHY.png" width="50" height="50" />:no:</li><li><img src="http://i.imgur.com/gYrm5BN.gif" width="50" height="50" />:kiddingme:</li><li><img src="http://i.imgur.com/q9AUeao.png" width="50" height="50" />:foreveralone:</li><li><img src="http://i.imgur.com/vMY9rnZ.jpg" width="50" height="50" />:foreveralonehappy:</li><li><img src="http://i.imgur.com/KYITacA.png" width="50" height="50" />:foreveralonedisapproval:</li><li><img src="http://i.imgur.com/7gGAvfl.png" width="50" height="50" />:yuno:</li><li><img src="http://i.imgur.com/MEiwQsa.png" width="50" height="50" />:biggrin:</li><li><img src="http://i.imgur.com/ST4U4r5.jpg" width="50" height="50" />:crying:</li><li><img src="http://i.imgur.com/WxTozYS.gif" width="50" height="50" />:megusta:</li><li><img src="http://i.imgur.com/pQ3f8uW.jpg" width="50" height="50" />:challengeaccepted:</li><li><img src="http://i.imgur.com/TUPik02.jpg" width="50" height="50" />:gtfo:</li><li><img src="http://i.imgur.com/XfCzUWB.jpg" width="50" height="50" />:watchout:</li><li><img src="http://i.imgur.com/bAZX0e1.png" width="50" height="50" />:notbad:</li><li><img src="http://i.imgur.com/ebx28bM.png" width="50" height="50" />:notbadmichelle:</li><li><img src="http://i.imgur.com/PE57n2V.jpg" width="50" height="50" />:seriously:</li><li><img src="http://i.imgur.com/8tkHKIg.jpg" width="50" height="50" />:truestory:</li><li><img src="http://i.imgur.com/PN6JV6D.png" width="50" height="50" />:youdontsay:</li><li><img src="http://i.imgur.com/zsXsEug.gif" width="50" height="50" />:dark:</li><li><img src="http://i.imgur.com/g8HArup.png" width="50" height="50" />:darkrage:</li><li><img src="http://i.imgur.com/6Bywiru.png" width="50" height="50" />:ilied:</li><li><img src="http://i.imgur.com/2PU46CT.png" width="50" height="50" />:cerealguy:</li><li><img src="http://i.imgur.com/JuyXaZS.png" width="50" height="50" />:cerealguyspit:</li><li><img src="http://i.imgur.com/CHwHGIN.jpg" width="50" height="50" />:allthethings:</li><li><img src="http://i.imgur.com/NCZSQnv.gif" width="50" height="50" />:trollface:</li><li><img src="http://i.imgur.com/eiAddoy.jpg" width="50" height="50" />:trollfaceking:</li><li><img src="http://i.imgur.com/NWELTrV.gif" width="50" height="50" />:trollfaceumad:</li><li><img src="http://i.imgur.com/jyUp1BI.gif" width="50" height="50" />:trollfacedealwithit:</li><li><img src="http://i.imgur.com/DhdtAek.png" width="50" height="50" />:trollfacesad:</li><li><img src="http://i.imgur.com/POqH3u8.gif" width="50" height="50" />:trollfaceie:</li><li><img src="http://i.imgur.com/Vkib6FC.gif" width="50" height="50" />:trollfacedance:</li></ul>';
} else {
  if (msgs[i].innerHTML.match(/:fffuuu:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:fffuuu:/, '<img src="http://i.imgur.com/BALjlSS.png" width="50" height="50" alt=":fffuuu:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:fffuuutears:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:fffuuutears:/, '<img src="http://i.imgur.com/QPOk2cC.png" width="50" height="50" alt=":fffuuutears:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/<img [^>]*alt="joy"[^>]*>/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/<img [^>]*alt="joy"[^>]*>/, '<img src="http://i.imgur.com/lQJIB4D.png" width="50" height="50" alt=":joy:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:happy:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:happy:/, '<img src="http://i.imgur.com/DTZAAki.png" width="50" height="50" alt=":happy:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:wat:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:wat:/, '<img src="http://i.imgur.com/ItEWEGQ.png" width="50" height="50" alt=":wat:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:why:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:why:/, '<img src="http://i.imgur.com/Sm7FxxZ.png" width="50" height="50" alt=":why:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:okay:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:okay:/, '<img src="http://i.imgur.com/18M2A9t.png" width="50" height="50" alt=":okay:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:sad:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:sad:/, '<img src="http://i.imgur.com/ePcg4eO.png" width="50" height="50" alt=":sad:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:lol:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:lol:/, '<img src="http://i.imgur.com/7xwztYz.png" width="50" height="50" alt=":lol:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:pokerface:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:pokerface:/, '<img src="http://i.imgur.com/4iHEint.png" width="50" height="50" alt=":pokerface:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:no:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:no:/, '<img src="http://i.imgur.com/8mjPZHY.png" width="50" height="50" alt=":no:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:kiddingme:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:kiddingme:/, '<img src="http://i.imgur.com/gYrm5BN.gif" width="50" height="50" alt=":kiddingme:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:foreveralone:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:foreveralone:/, '<img src="http://i.imgur.com/q9AUeao.png" width="50" height="50" alt=":foreveralone:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:foreveralonehappy:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:foreveralonehappy:/, '<img src="http://i.imgur.com/vMY9rnZ.jpg" width="50" height="50" alt=":foreveralonehappy:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:foreveralonedisapproval:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:foreveralonedisapproval:/, '<img src="http://i.imgur.com/KYITacA.png" width="50" height="50" alt=":foreveralonedisapproval:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:yuno:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:yuno:/, '<img src="http://i.imgur.com/7gGAvfl.png" width="50" height="50" alt=":yuno:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:biggrin:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:biggrin:/, '<img src="http://i.imgur.com/MEiwQsa.png" width="50" height="50" alt=":biggrin:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:crying:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:crying:/, '<img src="http://i.imgur.com/ST4U4r5.jpg" width="50" height="50" alt=":crying:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:megusta:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:megusta:/, '<img src="http://i.imgur.com/WxTozYS.gif" width="50" height="50" alt=":megusta:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:challengeaccepted:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:challengeaccepted:/, '<img src="http://i.imgur.com/pQ3f8uW.jpg" width="50" height="50" alt=":challengeaccepted:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:gtfo:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:gtfo:/, '<img src="http://i.imgur.com/TUPik02.jpg" width="50" height="50" alt=":gtfo:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:watchout:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:watchout:/, '<img src="http://i.imgur.com/XfCzUWB.jpg" width="50" height="50" alt=":watchout:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:notbad:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:notbad:/, '<img src="http://i.imgur.com/bAZX0e1.png" width="50" height="50" alt=":notbad:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:notbadmichelle:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:notbadmichelle:/, '<img src="http://i.imgur.com/ebx28bM.png" width="50" height="50" alt=":notbadmichelle:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:seriously:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:seriously:/, '<img src="http://i.imgur.com/PE57n2V.jpg" width="50" height="50" alt=":seriously:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:truestory:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:truestory:/, '<img src="http://i.imgur.com/8tkHKIg.png" width="50" height="50" alt=":truestory:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:youdontsay:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:youdontsay:/, '<img src="http://i.imgur.com/PN6JV6D.png" width="50" height="50" alt=":youdontsay:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:dark:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:dark:/, '<img src="http://i.imgur.com/zsXsEug.gif" width="50" height="50" alt=":dark:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:darkrage:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:darkrage:/, '<img src="http://i.imgur.com/g8HArup.png" width="50" height="50" alt=":darkrage:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:ilied:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:ilied:/, '<img src="http://i.imgur.com/6Bywiru.png" width="50" height="50" alt=":ilied:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:cerealguy:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:cerealguy:/, '<img src="http://i.imgur.com/2PU46CT.png" width="50" height="50" alt=":cerealguy:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:cerealguyspit:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:cerealguyspit:/, '<img src="http://i.imgur.com/JuyXaZS.png" width="50" height="50" alt=":cerealguyspit:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:allthethings:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:allthethings:/, '<img src="http://i.imgur.com/CHwHGIN.jpg" width="50" height="50" alt=":allthethings:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/<img [^>]*alt="trollface"[^>]*>/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/<img [^>]*alt="trollface"[^>]*>/, '<img src="http://i.imgur.com/NCZSQnv.gif" width="50" height="50" alt=":trollface:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfaceking:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfaceking:/, '<img src="http://i.imgur.com/eiAddoy.jpg" width="50" height="50" alt=":trollfaceking:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfaceumad:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfaceumad:/, '<img src="http://i.imgur.com/NWELTrV.gif" width="50" height="50" alt=":trollfaceumad:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfacedealwithit:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfacedealwithit:/, '<img src="http://i.imgur.com/jyUp1BI.gif" width="50" height="50" alt=":trollfacedealwithit:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfacesad:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfacesad:/, '<img src="http://i.imgur.com/DhdtAek.png" width="50" height="50" alt=":trollfacesad:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfaceie:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfaceie:/, '<img src="http://i.imgur.com/POqH3u8.gif" width="50" height="50" alt=":trollfaceie:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfacedance:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfacedance:/, '<img src="http://i.imgur.com/Vkib6FC.gif" width="50" height="50" alt=":trollfacedance:" style="margin: 2px 4px; vertical-align: middle" />');
  }
}if (msgs[i].innerHTML.match(/^\/striketroll/)) {
  msgs[i - 1].innerHTML = '<strike>' + msgs[i - 1].innerHTML + '</strike>';
  msgs[i].innerHTML = old.replace('/striketroll ', '');
}if (msgs[i].innerHTML.match(/^\/fliptroll/)) {
  msgs[i - 1].innerHTML = '<strong style="float: left; display: inline-block; -webkit-transform: matrix(-1, 0, 0, 1, 0, 0); transform: matrix(-1, 0, 0, 1, 0, 0); font-weight: normal">' + msgs[i - 1].innerHTML + '</strong>';
  msgs[i].innerHTML = old.replace('/fliptroll ', '');
}if (msgs[i].innerHTML.match(/^\/marqueetroll/)) {
  msgs[i - 1].innerHTML = '<marquee>' + msgs[i - 1].innerHTML + '</marquee>';
  msgs[i].innerHTML = old.replace('/marqueetroll ', '');
}if (msgs[i].innerHTML.match(/^\/flipmarqueetroll/)) {
  msgs[i - 1].innerHTML = '<marquee direction="right">' + msgs[i - 1].innerHTML + '</marquee>';
  msgs[i].innerHTML = old.replace('/marqueetroll ', '');
}if (msgs[i].innerHTML.match(/^\/gc$/)) {
  msgs[i].innerHTML = '<span style="color: #888"><em><a class="image-gc">Click to collapse all images.</a></em></span>';
  msgs[i].addEventListener('click', function() {
    if (!this.hasAttribute('data-iftl')) {
      this.innerHTML = '<span style="color: #888"><em>Inline images collapsed.</em></span>';
      for (var imgs = document.querySelectorAll('.text_message div.body a img'), j = 0; j < imgs.length; j++) {
        imgs[j].parentNode.innerHTML = '<a href="' + imgs[j].src + '" target="_blank">' + imgs[j].src + '</a>';
      }
      for (var mar = document.querySelectorAll('.text_message div.body marquee'), j = 0; j < mar.length; j++) {
        var old = mar[j].parentNode.innerHTML;
        mar[j].parentNode.innerHTML = old.replace(/\<\/?marquee[^>]*\>/g, '');
      }
      this.setAttribute('data-iftl', 'true');
    }
  }, false);
}var cvt=new Showdown.converter(),out=cvt.makeHtml(msgs[i].innerHTML);msgs[i].innerHTML=out;msgs[i].innerHTML=out;msgs[i].setAttribute('data-parsed','true');}  if (!msgs[i].hasAttribute('data-rich-tweet') && msgs[i].innerHTML.match(/<span [^>]*class="tweet clearfix"[^>]*>/)) {
    var tweetfetch = new XMLHttpRequest,
        url = msgs[i].getElementsByClassName('tweet_url')[0].href;
    tweetfetch.open('GET', '/libraries/user/scripts/richtweets.php?url=' + encodeURI(url), false);
    tweetfetch.onload = function() {
      var script = document.createElement('script');
      script.src = 'http://platform.twitter.com/widgets.js';
      document.getElementsByTagName('body')[0].appendChild(script);
      msgs[i].innerHTML = tweetfetch.responseText;
    };
    tweetfetch.send();
    msgs[i].setAttribute('data-rich-tweet','true');
  }if (msgs[i].innerHTML.match(/<a [^>]*class="image youtube_video"[^>]*>/)) {
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
}}