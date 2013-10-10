  if (!msgs[i].hasAttribute('data-rich-tweet') && msgs[i].innerHTML.match(/<span [^>]*class="tweet clearfix"[^>]*>/)) {
    var tweetfetch = new XMLHttpRequest,
        url = msgs[i].getElementsByClassName('tweet_url')[0].href;
    tweetfetch.open('GET', 'https://www.papermodelplane.net/libraries/user/scripts/richtweets.php?url=' + encodeURI(url), false);
    tweetfetch.onload = function() {
      var script = document.createElement('script');
      script.src = 'http://platform.twitter.com/widgets.js';
      document.getElementsByTagName('body')[0].appendChild(script);
      msgs[i].innerHTML = tweetfetch.responseText;
    };
    tweetfetch.send();
    msgs[i].setAttribute('data-rich-tweet','true');
  }