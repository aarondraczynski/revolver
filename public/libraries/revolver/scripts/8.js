if (msgs[i].innerHTML.match(/^\/flipmarqueetroll/)) {
  msgs[i - 1].innerHTML = '<marquee direction="right">' + msgs[i - 1].innerHTML + '</marquee>';
  msgs[i].innerHTML = old.replace('/marqueetroll ', '');
}