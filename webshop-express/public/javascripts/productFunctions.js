var showDesc = function () {
  document.querySelector('.descriptionDiv').classList.remove('hide');
  document.querySelector('.reviewsDiv').classList.remove('show');
}
var showRev = function () {
  document.querySelector('.reviewsDiv').classList.add('show');
  document.querySelector('.descriptionDiv').classList.add('hide');
}

var incValue = function () {
  const plusElement = document.querySelector('.prodNumber');
  const readNumber = parseInt(plusElement.value);
  value = readNumber + 1;
  plusElement.setAttribute('value', value);

  console.log(value);
}
var descValue = function () {
  const minusElement = document.querySelector('.prodNumber');
  const readNumber = parseInt(minusElement.value);
  if (readNumber > 1) {
    value = readNumber - 1;
    minusElement.setAttribute('value', value);
  } else {}

  console.log(value);
}