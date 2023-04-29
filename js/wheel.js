// Create a window onload function
window.onload = function() {
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
};