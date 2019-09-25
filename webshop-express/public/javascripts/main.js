window.onscroll = function (ev) {

  let basketSummary = document.querySelector('.basket-summary');
  let carousel = document.querySelector('.carousel');
  let footer = document.querySelector('footer');
  let header = document.querySelector('header');
  let nav = document.querySelector('nav');
  let basketContainer = document.querySelector('.basket-container');

  let basketStyle = window.getComputedStyle(basketSummary)
  let carouselStyle = window.getComputedStyle(carousel)
  let footerStyle = window.getComputedStyle(footer)
  let headerStyle = window.getComputedStyle(header)
  let navStyle = window.getComputedStyle(nav)
  let containerStyle = window.getComputedStyle(basketContainer)
  

  let splicedCarouselHeight = carouselStyle.height.slice(0, -2);
  let splicedFooterHeight = footerStyle.height.slice(0, -2);
  let splicedHeaderHeight = headerStyle.height.slice(0, -2);
  let splicedNavHeight = navStyle.height.slice(0, -2);
  let splicedContainerHeight = containerStyle.height.slice(0, -2);



  let height = document.documentElement.scrollHeight;
  let computedHeight = document.documentElement.scrollHeight - splicedCarouselHeight - splicedFooterHeight;
  let computedHeightFromTop = document.documentElement.scrollHeight - splicedHeaderHeight - splicedNavHeight - splicedContainerHeight;
  console.log("Computed height (carousel, footer):" + computedHeight);
  console.log("Computed height (top):" + computedHeightFromTop);
  console.log("Document height:" + height);

  let availHeight = window.screen.availHeight;
  console.log(availHeight);

  console.log("Scroll height:" + height);

  let basketDiv = document.querySelector('.basket-content');
  let basketDivHeight = window.getComputedStyle(basketDiv)
  
  //console.log("Basket height:" + basketStyle.height);

  
  const top = ev.currentTarget.scrollY;
  console.log(top);

  if (top >= 450 && top <=700) {
    basketSummary.classList.add('fixed-position');
  } else if (top > 700) {
    basketSummary.classList.remove('fixed-position');
    basketSummary.classList.add('absolute-position')
  }
  
  else {
    basketSummary.classList.remove('fixed-position');
    basketSummary.classList.remove('absolute-position');
  }

var offset = basketSummary.offsetTop + basketSummary.offsetHeight;
console.log("offset:" + offset);

  
};








