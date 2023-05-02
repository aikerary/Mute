// Create a window onload function
window.onload = function() {
    var lower = document.getElementById('lower').value;
    var upper = document.getElementById('upper').value;
    var zoom = document.getElementById('zoom').value;
    // Get the element with the class rounded-button
    var button = document.querySelector('.rounded-button');
    // When clicked, get the value of the elements with id lower and upper
    button.addEventListener('click', function() {
        lower = document.getElementById('lower').value;
        upper = document.getElementById('upper').value;
        zoom = document.getElementById('zoom').value;
        console.log(`Lower: ${lower}, Upper: ${upper}`);
        console.log(`Zoom: ${zoom}`);
    });
    
    // fetch('https://mutex.onrender.com/data', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     column: 'sport',
    //     rows: 10
    //   })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    //   console.log("fetching data");
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  };