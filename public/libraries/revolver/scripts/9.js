if (msgs[i].innerHTML.match(/^\/tweet/)) {
  removeClass(msgs[i].parentNode.parentNode, 'text_message');
  addClass(msgs[i].parentNode.parentNode, 'tweet_message');
  var username = old.match(/^\/tweet @([^\s]+)/)[1],
      avatar = msgs[i].querySelector('a').href;
  msgs[i].removeChild(msgs[i].querySelector('a'));
  old = msgs[i].innerHTML;
  old = old.replace(/^\/tweet @([^\s]+)/, '');
  msgs[i].innerHTML = '<span class="tweet clearfix"><span class="tweet_avatar"><a target="_blank" href="http://twitter.com/' + username + '"><img width="48" height="48" src="' + avatar + '"></a></span>' + old + ' <span class="tweet_author">&mdash; <a target="_blank" class="tweet_url" href="http://twitter.com/' + username + '">@' + username + '</a> via Twitter</span></span>';
  window.scrollTo(0, document.body.scrollHeight);
}