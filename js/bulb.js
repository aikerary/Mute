// Create an event listener to load window
window.addEventListener('load', function() {
    // Get the element with the class mouseketool
    var mouseketool = document.querySelector('.mouseketool');
    // When clicked, toggle the class active
    mouseketool.addEventListener('click', function() {
        mouseketool.classList.toggle('active');
        // Toggle the class "bulbed" on the body
        document.body.classList.toggle('bulbed');
    });
});