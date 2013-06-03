if (msgs[i].innerHTML.match(/^\/gc$/)) {
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
}