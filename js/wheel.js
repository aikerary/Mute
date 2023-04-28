// Create a window onload function
window.onload = function() {
    // Select all the items with the class name toggle
    var toggles = document.getElementsByClassName('toggle');
    // Select all the items with the class name menu
    var menus = document.getElementsByClassName('menu');
    // Use an event listener for toggle to toggle the class name active
    for (var i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    // Use an event listener for menu to toggle the class name active
    for (var i = 0; i < menus.length; i++) {
        menus[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
};