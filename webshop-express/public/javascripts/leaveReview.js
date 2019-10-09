let origDetails = '';

const toggleReview = function (productId, userId) {

  // Data creating
  const url = 'http://localhost:3001/products/reviews';
  const data = {
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
  const details = document.querySelector('textarea.writeSmth').value;

  // Data creating
  const url = 'http://localhost:3001/products/reviews';
  const data = {
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
  location.reload();
}

const editReview = function (revId) {

  const rev = document.querySelector(`#oneReview${revId}>textarea`);
  origDetails = rev.value;
  rev.removeAttribute("disabled");
  $(`.revBut${revId}`).toggleClass("hide");

}

const cancelReview = function (revId) {

  const rev = document.querySelector(`#oneReview${revId}>textarea`);
  rev.value = origDetails;
  rev.setAttribute("disabled", "disabled");
  $(`.revBut${revId}`).toggleClass("hide");

}

const saveReview = function (revId) {

  const details = document.querySelector(`#oneReview${revId}>textarea`).value;

  // Data creating
  const url = 'http://localhost:3001/products/reviews';
  const data = {
    reviewId: revId,
    details: details
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

  document.querySelector(`#oneReview${revId}>textarea`).setAttribute("disabled", "disabled");
  $(`.revBut${revId}`).toggleClass("hide");

}

const deleteReview = function (revId) {



  // Data creating
  const url = 'http://localhost:3001/products/reviews';
  const data = {
    reviewId: revId
  };

  // Fetch http req
  fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      document.querySelector(`#wholeRev${revId}`).setAttribute('style', 'display: none');
    });

}