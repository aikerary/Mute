// Create an add event listener to load window
window.addEventListener('load', function() {
    // Get the element with id="bulb-button"
    var bulbButton = document.querySelector('#bulb-button');
    // When the bulb button is clicked, reproduce the file with 
    // the name "src/click.mp3"
    function playClick() {
        var audio = document.getElementById("audio-click");
        audio.play();
      }
    bulbButton.addEventListener('click', function() {
        playClick();
    }
    );
});