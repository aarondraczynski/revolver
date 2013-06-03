if (msgs[i].innerHTML.match(/^\/striketroll/)) {
  msgs[i - 1].innerHTML = '<strike>' + msgs[i - 1].innerHTML + '</strike>';
  msgs[i].innerHTML = old.replace('/striketroll ', '');
}