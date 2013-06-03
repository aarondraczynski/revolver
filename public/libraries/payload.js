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
      msgs[i].innerHTML = '<span class="tweet clearfix"><span class="tweet_avatar"><a target="_blank" href="' + response.url + '"><img width="48" height="48" src="' + response.image + '"></a></span><b><a target="_blank" href="' + response.url + '" class="tweet_url" style="display: inline-block; font-size: 13px; margin: 0 0 3px">' + response.title + '</a></b><br />' + response.description + '<span class="tweet_author">&mdash; <a target="_blank" href="' + response.url + '" class="tweet_url">' + response.site_name + "</a></span></span>";
    };
    request.onerror = function() {
      msgs[i].innerHTML = old.replace(/^\/link/, '');
    };
    request.send();
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
}if (msgs[i].innerHTML.match(/^\/tweet/)) {
  removeClass(msgs[i].parentNode.parentNode, 'text_message');
  addClass(msgs[i].parentNode.parentNode, 'tweet_message');
  var username = old.match(/^\/tweet @([^\s]+)/)[1],
      avatar = msgs[i].querySelector('a').href;
  msgs[i].removeChild(msgs[i].querySelector('a'));
  old = msgs[i].innerHTML;
  old = old.replace(/^\/tweet @([^\s]+)/, '');
  msgs[i].innerHTML = '<span class="tweet clearfix"><span class="tweet_avatar"><a target="_blank" href="http://twitter.com/' + username + '"><img width="48" height="48" src="' + avatar + '"></a></span>' + old + ' <span class="tweet_author">&mdash; <a target="_blank" class="tweet_url" href="http://twitter.com/' + username + '">@' + username + '</a> via Twitter</span></span>';
  window.scrollTo(0, document.body.scrollHeight);
}var cvt=new Showdown.converter(),out=cvt.makeHtml(msgs[i].innerHTML);msgs[i].innerHTML=out;msgs[i].innerHTML=out;msgs[i].setAttribute('data-parsed','true');}}