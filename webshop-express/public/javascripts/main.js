window.onscroll = function (ev) {
  console.log(ev.currentTarget.scrollY);
  console.log("Window height:" + window.innerHeight);


  const basketSummary = document.querySelector('.basket-summary');
  const top = ev.currentTarget.scrollY;

  if (top >= 400) {
    basketSummary.classList.add('fixed-position');
  } else {
    basketSummary.classList.remove('fixed-position');
  }
};

function computedStyle(){
  let basketSummary = document.querySelector('.basket-summary');
  let carousel = document.querySelector('.carousel');
  let footer = document.querySelector('footer');
  let basketStyle = window.getComputedStyle(basketSummary)
  let carouselStyle = window.getComputedStyle(carousel)
  let footerStyle = window.getComputedStyle(footer)
  console.log("Basket height:" + basketStyle.height);
  console.log("Carousel height:" + carouselStyle.height);
  console.log("Footer height:" + footerStyle.height);
  
}

computedStyle()