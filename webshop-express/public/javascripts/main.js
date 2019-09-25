window.onscroll = function (ev) {

  let basketSummary = document.querySelector('.basket-summary');

  if (top >= 450 && top <= 700) {
    basketSummary.classList.add('fixed-position');
  } else if (top > 700) {
    basketSummary.classList.remove('fixed-position');
    basketSummary.classList.add('absolute-position')
  } else {
    basketSummary.classList.remove('fixed-position');
    basketSummary.classList.remove('absolute-position');
  }


};