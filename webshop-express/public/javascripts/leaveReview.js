const toggleReview = function (productId, userId) {

  // Data creating
  var url = 'http://localhost:3000/products/reviews';
  var data = {
    user: userId,
    snowboardId: productId,
  };

  // Fetch http req
  fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (response) {
        document.getElementById("review").classList.toggle("show");
        document.getElementById("review").classList.toggle("hide");
      } else {
        document.getElementById("alertDiv").classList.toggle("show");
        document.getElementById("alertDiv").classList.toggle("hide");
        setTimeout(function () {
          document.getElementById("alertDiv").classList.toggle("hide");
          document.getElementById("alertDiv").classList.toggle("show");
        }, 5000);

      }
    });

}


const leaveReview = function (productId, userId) {

  // Value read from document
  const radios = document.getElementsByName('rating');
  let rate = 0;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      rate = parseFloat(radios[i].value);
    }
  }
  const details = document.querySelector('textarea').value;

  // Data creating
  var url = 'http://localhost:3000/products/reviews';
  var data = {
    user: userId,
    snowboardId: productId,
    details: details,
    rate: rate
  };

  // Fetch http req
  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error));

  // toggle back
  document.getElementById("review").classList.toggle("show");
  document.getElementById("review").classList.toggle("hide");
}