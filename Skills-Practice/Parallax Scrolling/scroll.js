//Note: not listening to WindowsScrollEvent because it gets called many times per second,
//      faster than the screen can update and therefore would be wasted CPU work.
//Note: The way we change the position of the elements is by using translate3d, 
//      which pushes all of the drawing and rendering to the graphics card,
//      and not on the CPU (which can have implications on a mobile device which has heavy use of CPU)
window.addEventListener("DOMContentLoaded", scrollLoop, false);

//Identify elements to scale scrolling speed on
var bigYellowCircle = document.querySelector("#bigYellowCircle");
var blueSquare = document.querySelector("#blueSquare");
var greenPentagon = document.querySelector("#greenPentagon");

//Define variables to log current screen horizontal and vertical position
var xScrollPostion;
var yScrollPostion;

//function gets called on DOMContentLoaded, identifies current screen coordinates
//and sets positions of elements to a given scale to make them move either up/down (+/-) or faster/slower (larger/smaller)
function scrollLoop(e) {
    xScrollPosition = window.scrollX;
    yScrollPosition = window.scrollY;

    setTranslate(0, yScrollPosition*-0.2, bigYellowCircle);
    setTranslate(0, yScrollPosition*-1.5, blueSquare);
    setTranslate(0, yScrollPosition*.5, greenPentagon);

    //The window.requestAnimationFrame() method tells the browser that you wish to perform an animation 
    //and requests that the browser call a specified function to update an animation before the next repaint.
    requestAnimationFrame(scrollLoop);
}

//Sets the CSS styling to change element to the new position.
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "," + yPos + "px, 0";
}