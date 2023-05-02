// Create a window onload function
window.onload = function() {
    var lower = document.getElementById('lower').value;
    var upper = document.getElementById('upper').value;
    // Get the element with the class rounded-button
    var button = document.querySelector('.rounded-button');
    // When clicked, get the value of the elements with id lower and upper
    button.addEventListener('click', function() {
        lower = document.getElementById('lower').value;
        upper = document.getElementById('upper').value;
        console.log(`Lower: ${lower}, Upper: ${upper}`);
    });
    
    function fetchData(lower, upper, classActive0, classActive1) {
      active1 = false;
      active0 = false;
      fetch('https://mutex.onrender.com/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first: classActive0,
            second: classActive1,
            upper: upper,
            lower: lower,
            column_name: 'sport',
            num_rows: 10
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
      });}
  };