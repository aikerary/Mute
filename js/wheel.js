// Create a window onload function
window.addEventListener('load', function() {
    var classActive1;
    var active1 = false;
    var classActive0;
    var active0 = false;
    // Select all the items with the class name toggle
    var toggles = document.getElementsByClassName('toggle');
    // Select all the items with the class name menu
    var menus = document.getElementsByClassName('menu');
    // With toggle 0, add an event listener for a click
    toggles[0].addEventListener('click', function() {
        // Toogle the class "active" for the menu
        menus[0].classList.toggle('active');
        toggles[0].classList.toggle('active');
    });
    // With toggle 1, add an event listener for a click
    toggles[1].addEventListener('click', function() {
        // Toogle the class "active" for the menu
        menus[1].classList.toggle('active');
        toggles[1].classList.toggle('active');
    });
    // Get all the childs of menu 0 that are li
    var menuItems0 = menus[0].getElementsByTagName('li');
    function activeLi0(){
        // For each item in the menu
        for (var i = 0; i < menuItems0.length; i++) {
            // If the item is clicked
            menuItems0[i].addEventListener('click', function() {
                // Remove the class active from all the items
                for (var j = 0; j < menuItems0.length; j++) {
                    menuItems0[j].classList.remove('active');
                }
                this.classList.add('active');
            });
        }
    }
    activeLi0();
    // Get all the childs of menu 1 that are li
    var menuItems1 = menus[1].getElementsByTagName('li');
    function activeLi1(){
        // For each item in the menu
        for (var i = 0; i < menuItems1.length; i++) {
            // If the item is clicked
            menuItems1[i].addEventListener('click', function() {
                // Remove the class active from all the items
                for (var j = 0; j < menuItems1.length; j++) {
                    menuItems1[j].classList.remove('active');
                }
                this.classList.add('active');
            });
        }
    }
    activeLi1();

    // Create a function for menuItems0, when you click on the item
    // it will search the element that contains the same class in 
    // menuItems1 and delete the class active from it
    function removeActive0(){
        for (var i = 0; i < menuItems0.length; i++) {
            menuItems0[i].addEventListener('click', function() {
                for (var j = 0; j < menuItems1.length; j++) {
                    if (menuItems1[j].classList.contains(this.classList[0])) {
                        menuItems1[j].classList.remove('active');
                    }
                }
            });
        }
    }
    removeActive0();
    // Create a function for menuItems1, when you click on the item
    // it will search the element that contains the same class in
    // menuItems0 and delete the class active from it
    function removeActive1(){
        for (var i = 0; i < menuItems1.length; i++) {
            menuItems1[i].addEventListener('click', function() {
                for (var j = 0; j < menuItems0.length; j++) {
                    if (menuItems0[j].classList.contains(this.classList[0])) {
                        menuItems0[j].classList.remove('active');
                    }
                }
            });
        }
    }
    removeActive1();
    // Add an event listener to prove if both menus has at least one menuItem active
    menus[0].addEventListener('click', function() {
        for (var i = 0; i < menuItems0.length; i++) {
            if (menuItems0[i].classList.contains('active')) {
                // Test if the menuItems1[i] has no the class active
                if (!menuItems1[i].classList.contains('active')) {
                    active0 = true;
                    classActive0 = menuItems0[i].classList[0];
                }
            }
            if (menuItems1[i].classList.contains('active')) {
                active1 = true;
                classActive1 = menuItems1[i].classList[0];
            }
        }
        var lower = document.getElementById('lower').value;
        var upper = document.getElementById('upper').value;
        if (active0 && active1) {
            fetchData(lower, upper, classActive0, classActive1);
        }
    }
    );
    menus[1].addEventListener('click', function() {
        for (var i = 0; i < menuItems1.length; i++) {
            if (menuItems1[i].classList.contains('active')) {
                // Test if the menuItems0[i] has no the class active
                if (!menuItems0[i].classList.contains('active')) {
                    active1 = true;
                    classActive1 = menuItems1[i].classList[0];
                }
                if (menuItems0[i].classList.contains('active')) {
                    active0 = true;
                    classActive0 = menuItems0[i].classList[0];
                }
            }
        }
        var lower = document.getElementById('lower').value;
        var upper = document.getElementById('upper').value;
        if (active0 && active1) {
            fetchData(lower, upper, classActive0, classActive1);
        }
    }
    );

    // Create a function named "fetchData"
    // It has the parameters "lower" and "upper" and "classActive0" and "classActive1"
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
});