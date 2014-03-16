if (msgs[i].innerHTML.match(/^\/fastermarqueetroll/)) {
  msgs[i - 1].innerHTML = '<marquee scrollamount="40">' + msgs[i - 1].innerHTML + '</marquee>';
  msgs[i].innerHTML = old.replace('/marqueetroll ', '');
}