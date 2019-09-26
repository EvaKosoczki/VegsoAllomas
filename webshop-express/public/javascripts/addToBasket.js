// document.getElementsByClassName('formClass').addEventListener("click", function (event) {
//   event.preventDefault();
// })

const addToBasket = function (productId) {
  // event.preventDefault();

  const quantity = parseInt(document.querySelector('.prodNumber').value);

  let xhr = new XMLHttpRequest();
  const url = 'http://localhost:3000/basket';


  xhr.open('post', url, true);

  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");

  xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Request finished. Do processing here.
      console.log(xhr.responseText);
    }
  }

  const dataArray = {
    snowboardId: productId,
    quantity: quantity,
  }
  const data = JSON.stringify(dataArray);


  console.log(data);
  xhr.send(data);


  // var url = 'http://localhost:3000/basket';
  // var data = {
  //   snowboardId: productId,
  //   quantity: quantity,
  // };

  // fetch(url, {
  //     method: 'POST', // or 'PUT'
  //     body: JSON.stringify(data), // data can be `string` or {object}!
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .catch(error => console.error('Error:', error))
  //   .then(response => console.log('Success:', response));

}