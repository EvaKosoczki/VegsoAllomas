const showDesc = function () {
  document.querySelector('.descriptionDiv').classList.remove('hide');
  document.querySelector('.reviewsDiv').classList.remove('show');
}
const showRev = function () {
  document.querySelector('.reviewsDiv').classList.add('show');
  document.querySelector('.descriptionDiv').classList.add('hide');
}

const incValue = function () {
  const plusElement = document.querySelector('.prodNumber');
  const readNumber = parseInt(plusElement.value);
  value = readNumber + 1;
  plusElement.setAttribute('value', value);

}
const descValue = function () {
  const minusElement = document.querySelector('.prodNumber');
  const readNumber = parseInt(minusElement.value);
  if (readNumber > 1) {
    value = readNumber - 1;
    minusElement.setAttribute('value', value);
  } else {}

}