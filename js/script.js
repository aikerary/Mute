// Create a window onload function
window.onload = function() {
    let active1 = false;
    let active0 = false;
    let classActive0;
    let classActive1;
    const menus = document.getElementsByClassName('menu');
    const menuItems0 = menus[0].getElementsByTagName('li');
    const menuItems1 = menus[1].getElementsByTagName('li');
    const lower = document.getElementById('lower');
    const upper = document.getElementById('upper');
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
    
    function fetchData(lower, upper, classActive0, classActive1, gender) {
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
            gender: gender,
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