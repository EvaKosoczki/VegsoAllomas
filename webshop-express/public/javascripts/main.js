window.onscroll = function (ev) {

  let basketSummary = document.querySelector('.basket-summary');
<<<<<<< HEAD
    
  const top = ev.currentTarget.scrollY;

  if (top >= 450 && top <=700) {
=======

  if (top >= 450 && top <= 700) {
>>>>>>> cc47cebedecb38601834556adbb19789e87549d9
    basketSummary.classList.add('fixed-position');
  } else if (top > 700) {
    basketSummary.classList.remove('fixed-position');
    basketSummary.classList.add('absolute-position')
  } else {
    basketSummary.classList.remove('fixed-position');
    basketSummary.classList.remove('absolute-position');
  }

<<<<<<< HEAD
  
};







=======
>>>>>>> cc47cebedecb38601834556adbb19789e87549d9

};