// Create a window onload function
window.addEventListener('load', function() {
    // Select all the items with the class name toggle
    const toggles = document.getElementsByClassName('toggle');
    // Select all the items with the class name menu
    const menus = document.getElementsByClassName('menu');
    // With toggle 0, add an event listener for a click
    const slide_upper = document.getElementById('upper');
    const slide_lower = document.getElementById('lower');
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

    // Create a function that receives a list of items, and an index
    function toggleActiveWheels(items_a, items_b, index) {
        // Remove all the class "active" in items_a
        for (let i = 0; i < items_a.length; i++) {
            items_a[i].classList.remove('active');
        }
        items_a[index].classList.add('active');
        verifyOtherActive(items_b, index);
    }

    function verifyOtherActive(items_b, index){
        // If the class "active" is in items_b[index]
        // Remove the class active from items_b[index]
        if (items_b[index].classList.contains('active')) {
            items_b[index].classList.remove('active');
        }
    }

    function checkForActiveItem(list1, list2) {
        let activeItemFound1 = false;
        let activeItemFound2 = false;
        for (let i = 0; i < list1.length; i++) {
            if (list1[i].classList.contains('active')) {
                activeItemFound1 = true;
            }
            if (list2[i].classList.contains('active')) {
                activeItemFound2 = true;
            }
        }
        return activeItemFound1 && activeItemFound2;
      }
    
    function checkAndReturn(list1, list2){
        let classActive0='';
        let classActive1='';
        for (let i = 0; i < list1.length; i++) {
            if (list1[i].classList.contains('active')) {
                classActive0 = list1[i].classList[0];
            }
            if (list2[i].classList.contains('active')) {
                classActive1 = list2[i].classList[0];  
            }
        }
        return [classActive0, classActive1];
    }

    async function checkAndFetch(list1, list2, slider_lower, slider_upper) {
        const lower = slider_lower.value;
        const upper = slider_upper.value;
        if (checkForActiveItem(list1, list2)) {
          const classes = checkAndReturn(list1, list2);
          try {
            const [json_M, json_F] = await Promise.all([
              fetchData(lower, upper, classes[0], classes[1], "_M"),
              fetchData(lower, upper, classes[0], classes[1], "_F")
            ]);
            console.log("Data for males:", json_M);
            console.log("Data for females:", json_F);
          } catch (error) {
            console.error(error);
          }
        }
      }
      
    // Get all the childs of menu 0 that are li
    const menuItems0 = menus[0].getElementsByTagName('li');
    // Get all the childs of menu 1 that are li
    const menuItems1 = menus[1].getElementsByTagName('li');

    // Add event listeners for each item in menuItems0
    for (let i = 0; i < menuItems0.length; i++) {
        menuItems0[i].addEventListener('click', function() {
            // Toggle the class "active" for the menu
            toggleActiveWheels(menuItems0, menuItems1, i);
            checkAndFetch(menuItems0, menuItems1, slide_lower, slide_upper);
        });
    }

    // Add event listeners for each item in menuItems1
    for (let i = 0; i < menuItems1.length; i++) {
        menuItems1[i].addEventListener('click', function() {
            // Toggle the class "active" for the menu
            toggleActiveWheels(menuItems1, menuItems0, i);
            checkAndFetch(menuItems0, menuItems1, slide_lower, slide_upper);
        });
    }

    // Create a function named "fetchData"
    // It has the parameters "lower" and "upper" and "classActive0" and "classActive1"
    async function fetchData(lower, upper, classActive0, classActive1, gender) {
        try {
            const response = await fetch('https://mutex.onrender.com/data', {
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
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }}
});