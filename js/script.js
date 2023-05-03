// Create a window onload function
window.onload = function() {
    let active1 = false;
    let active0 = false;
    let classActive0;
    let classActive1;
    var menus = document.getElementsByClassName('menu');
    var menuItems0 = menus[0].getElementsByTagName('li');
    var menuItems1 = menus[1].getElementsByTagName('li');
    var lower = document.getElementById('lower').value;
    var upper = document.getElementById('upper').value;
    // Get the element with the class rounded-button
    const button = document.querySelector('.rounded-button');
    // When clicked, get the value of the elements with id lower and upper
    button.addEventListener('click', function()  {
        lower = document.getElementById('lower').value;
        upper = document.getElementById('upper').value;
        console.log("I'm here");
        console.log(`Lower: ${lower}, Upper: ${upper}`);
        for (var i = 0; i < menuItems0.length; i++) {
            if (menuItems0[i].classList.contains('active')) {
                classActive0 = menuItems0[i].classList[0];
                active0 = true;

            }
        }
        for (var i = 0; i < menuItems1.length; i++) {
            if (menuItems1[i].classList.contains('active')) {
                classActive1 = menuItems1[i].classList[0];
                active1 = true;
            }
        }
        if (active0 && active1) {
            fetchData(lower, upper, classActive0, classActive1);
        }
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