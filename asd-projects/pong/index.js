/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    // Constant Variables
    var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
    var KEY = {
        UP: 38,
        DOWN: 40,
        W: 87,
        S: 83,
        SPACE: 32,
    };

    var boardWidth = $('#board').width();
    var boardHeight = $('#board').height();
    var paddleSpeed = 5;
    var speedIncreaseRate = 1.1;
    var endScore = 3;
    
    // Game Item Objects
    var ball = gameObject('#ball');

    var paddle1 = gameObject('#paddle1');

    var paddle2 = gameObject('#paddle2');

    // one-time setup
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
    $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
    $(document).on('keyup', handleKeyUp); 

    var points1 = 0;
    var points2 = 0;
    $('#score1').text(0);
    $('#score2').text(0);

    resetBall();

    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// CORE LOGIC ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    /* 
    On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
    by calling this function and executing the code inside.
    */
    function newFrame() {
        // update ball position
        updateBallPosition();
        updatePaddlePosition(paddle1);
        updatePaddlePosition(paddle2);

        // handle collisions
        handlePaddleCollision(paddle1);
        handlePaddleCollision(paddle2);
        handleWallBounces();
        checkForScore();
        
        // redraw objects
        redrawBall();
        redrawPaddles();
    }
    
    /* 
    Called in response to events.
    */
    function handleKeyDown(event) {
        if (event.which === KEY.UP){
            paddle2.speedY = -paddleSpeed;
        }
        if (event.which === KEY.DOWN){
            paddle2.speedY = paddleSpeed;
        }
        if (event.which === KEY.W){
            paddle1.speedY = -paddleSpeed;
        }
        if (event.which === KEY.S){
            paddle1.speedY = paddleSpeed;
        }
    }

    function handleKeyUp(event) {
        if (event.which === KEY.UP || event.which === KEY.DOWN){
            paddle2.speedY = 0;
        }
        if (event.which === KEY.W || event.which === KEY.S){
            paddle1.speedY = 0;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    // create a game object based on an HTML element
    function gameObject($element){
        return {
            x: Number($($element).css('left').replace(/[^-\d\.]/g, '')),
            y: Number($($element).css('top').replace(/[^-\d\.]/g, '')),
            width: $($element).width(),
            height: $($element).height(),
            speedX: 0,
            speedY: 0,
        };
    }
    // generate a random number from a given range
    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // update the ball position
    function updateBallPosition() {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
    }

    // update paddle positions
    function updatePaddlePosition(paddle){
        paddle.y += paddle.speedY;
        if (paddle.y < 0 || paddle.y + paddle.height > boardHeight){
            paddle.y -= paddle.speedY;
        }
    }

    // draw the ball at its new position
    function redrawBall(){
        $('#ball').css('left', ball.x);
        $('#ball').css('top', ball.y);
    }

    // draw the paddles at their new positions
    function redrawPaddles(){
        $('#paddle1').css('top', paddle1.y);
        $('#paddle2').css('top', paddle2.y);
    }

    // check for a paddle collision (simple approach)
    function handlePaddleCollision(paddle){
        if (overlap(paddle, ball)){
            ball.speedX = -ball.speedX;
            ball.x += ball.speedX;
            ball.speedX *= speedIncreaseRate;
            ball.speedY *= speedIncreaseRate;
        }
    }

    // handle ceiling and floor collissions
    function handleWallBounces(){
        if (ball.y < 0 || ball.y + ball.height > boardHeight){
            ball.y -= ball.speedY;
            ball.speedY = -ball.speedY;
        }
    }

    // handle scoring
    function checkForScore(){
        if (ball.x < 0){
            resetBall();
            points2++;
            updateScore('#score1', points2);
        }
        else if (ball.x + ball.width > boardWidth){
            resetBall();
            points1++;
            updateScore('#score2', points1);
        }
    }

    // update the score and possibly end the game
    function updateScore($element, points){
        $($element).text(points);
        if (points >= endScore){
            endGame();
        }
    }
    
    // reset ball position
    function resetBall(){
        ball.x = boardWidth/2 - ball.width/2;
        ball.y = boardHeight/2 - ball.height/2;

        ball.speedX = randomRange(-5, 5);
        ball.speedY = randomRange(-3, 3);

        if (Math.round(ball.speedX) === 0){
            if (ball.speedX < 0) {
                ball.speedX--;
            }
            else {
                ball.speedX++;
            }
        }
        if (Math.round(ball.speedY) === 0){
            if (ball.speedY < 0) {
                ball.speedY--;
            }
            else {
                ball.speedY++;
            }
        }
    }

    // check if two objects overlap
    function overlap(obj1, obj2){
        var right1 = obj1.x + obj1.width;
        var right2 = obj2.x + obj2.width;
        var left1 = obj1.x;
        var left2 = obj2.x;
        var top1 = obj1.y;
        var top2 = obj2.y;
        var bottom1 = obj1.y + obj1.height;
        var bottom2 = obj2.y + obj2.height;

        if (left1 < right2 && left2 < right1 && top1 < bottom2 && top2 < bottom1){
            return true;
        }
        return false;
    }

    function endGame() {
        // stop the interval timer
        clearInterval(interval);

        // turn off event handlers
        $(document).off();
    }
    
}
