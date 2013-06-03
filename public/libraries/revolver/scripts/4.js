if (msgs[i].innerHTML.match(/^\/fliptroll/)) {
  msgs[i - 1].innerHTML = '<strong style="float: left; display: inline-block; -webkit-transform: matrix(-1, 0, 0, 1, 0, 0); transform: matrix(-1, 0, 0, 1, 0, 0); font-weight: normal">' + msgs[i - 1].innerHTML + '</strong>';
  msgs[i].innerHTML = old.replace('/fliptroll ', '');
}