window.onscroll = function (ev) {
  console.log(ev.currentTarget.scrollY);

  const basketSummary = document.querySelector('.basket-summary');
  const top = ev.currentTarget.scrollY;

  if (top >= 400) {
    basketSummary.classList.add('fixed-position');
  } else {
    basketSummary.classList.remove('fixed-position');
  }
};
