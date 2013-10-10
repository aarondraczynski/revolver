if (msgs[i].innerHTML.match(/^\/fastmarqueetroll/)) {
  msgs[i - 1].innerHTML = '<marquee scrollamount="20">' + msgs[i - 1].innerHTML + '</marquee>';
  msgs[i].innerHTML = old.replace('/marqueetroll ', '');
}