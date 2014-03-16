if (msgs[i].innerHTML.match(/^\/marqueetroll/)) {
  msgs[i - 1].innerHTML = '<marquee>' + msgs[i - 1].innerHTML + '</marquee>';
  msgs[i].innerHTML = old.replace('/marqueetroll ', '');
}