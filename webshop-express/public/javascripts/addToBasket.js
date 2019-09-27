const addToBasket = function (productId, userId) {

  // Value read from document
  const quantity = parseInt(document.querySelector('.prodNumber').value);


  // Data creating
  var url = 'http://localhost:3000/basket';
  var data = {
    user: userId,
    snowboardId: productId,
    quantity: quantity,
  };

  // Fetch http req
  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => document.querySelector('span.counter').innerHTML = response, document.querySelector('span.counter').classList.add('explode'), setTimeout(function(){document.querySelector('span.counter').classList.remove('explode')},1000));

}