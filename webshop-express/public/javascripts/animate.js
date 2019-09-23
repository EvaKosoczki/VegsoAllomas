const descDiv = document.getElementById('descriptionDiv');
const revDiv = document.getElementById('reviewsDiv');

function showDesc() {
  descDiv.classList.remove('hide');
  revDiv.classList.remove('show');
}

function showRev() {
  revDiv.classList.add('show');
  descDiv.classList.add('hide');
}

// function showDesc() {
//   descDiv.style('display', 'block');
//   revDiv.style('display', 'none');
// }

// function showRev() {
//   revDiv.style('display', 'block');
//   descDiv.style('display', 'none');
// }
