// Create a window.onload function
window.addEventListener('load', function() {
    // Get the element with the id "zoom"
    const zoom = document.getElementById('zoom');
    // Get the element with the id "graphs"
    const graphs = document.getElementById('graphs');
    
    // add an event listener when click the zoom element
    // it will increase the width and height of the graphs element
    // by percentage with the value of zoom, (zoom is an input)
    zoom.addEventListener('click', function() {
        graphs.style.width = `${zoom.value*2.2}%`;
        graphs.style.height = `${zoom.value*2.2}%`;
    }
    );
});