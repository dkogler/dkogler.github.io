/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
    ////////////////////////////////////////////////////////////////////////////////
    //////////////////////////// SETUP /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    // Constant Variables
    var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
    var KEY = {
        "LEFT": 37,
        "UP": 38,
        "RIGHT": 39,
        "DOWN": 40
    }
    // Game Item Objects
    var positionX = 0, positionY = 0, speedX = 0, speedY = 0;

    // one-time setup
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
    $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
    $(document).on('keyup', handleKeyUp);

    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// CORE LOGIC ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    /* 
    On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
    by calling this function and executing the code inside.
    */
    function newFrame() {
        repositionGameItem();
        redrawGameItem();
    }
    
    /* 
    Called in response to events.
    */
    function handleKeyDown(event) {
        if (event.keyCode == KEY.LEFT){
            speedX -= 5;
        }
        else if (event.keyCode == KEY.RIGHT){
            speedX += 5;
        }
        else if (event.keyCode == KEY.UP){
            speedY -= 5;
        }
        else if (event.keyCode == KEY.DOWN){
            speedY += 5;
        }
    }

    function handleKeyUp(event) {
        if (event.keyCode == KEY.LEFT){
            speedX = 0;
        }
        else if (event.keyCode == KEY.RIGHT){
            speedX = 0;
        }
        else if (event.keyCode == KEY.UP){
            speedY = 0;
        }
        else if (event.keyCode == KEY.DOWN){
            speedY = 0;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    function repositionGameItem(){
        positionX += speedX;
        positionY += speedY;

        if (positionX > 440|| positionX < 0){
            positionX -= speedX;
        }
        if (positionY > 440 || positionY < 0){
            positionY -= speedY;
        }
    }

    function redrawGameItem(){
        $("#gameItem").css("left", positionX);
        $("#gameItem").css("top", positionY);
    }
    
    function endGame() {
        // stop the interval timer
        clearInterval(interval);

        // turn off event handlers
        $(document).off();
    }
  
}
