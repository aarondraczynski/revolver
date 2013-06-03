if (msgs[i].innerHTML.match(/^\/link/)) {
  var link = msgs[i].querySelector('a');
  if (link !== null) {
    var request = new XMLHttpRequest,
        url = link.getAttribute('href');
    request.open('GET', 'http://logansbailey.com/ogp/?q=' + encodeURI(url), false);
    request.onload = function() {
      var response = JSON.parse(this.response);
      msgs[i].innerHTML = '<span class="tweet clearfix"><span class="tweet_avatar"><a target="_blank" href="' + response.url + '"><img width="48" height="48" src="' + response.image + '"></a></span><b><a target="_blank" href="' + response.url + '" class="tweet_url" style="display: inline-block; font-size: 13px; margin: 0 0 3px">' + response.title + '</a></b><br />' + response.description + '<span class="tweet_author">&mdash; <a target="_blank" href="' + response.url + '" class="tweet_url">' + response.site_name + "</a></span></span>";
    };
    request.onerror = function() {
      msgs[i].innerHTML = old.replace(/^\/link/, '');
    };
    request.send();
  }
}