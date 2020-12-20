/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
    ////////////////////////////////////////////////////////////////////////////////
    //////////////////////////// SETUP /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    // Constant Variables
    var FRAMES_PER_SECOND_INTERVAL = 100;
    var TILE_SIZE = 20;
    var COLUMNS = $('#board').width() / TILE_SIZE;
    var ROWS = $('#board').height() / TILE_SIZE;
    var START_COLUMN = 3;
    var START_ROW = 3;
    var CUTOFF = 100;

    var KEY = {
        "LEFT": 37,
        "UP": 38,
        "RIGHT": 39,
        "DOWN": 40
    }

    // Game Item Objects
    var snake = [$('#snakeHead'), $('.snakeBody')];
    var $apple = $('#apple');
    var $score = $('#score');
    var canInput = true;
    
    // one-time setup
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
    $(document).on('keydown', handleKeyPressed);                           // change 'eventType' to the type of event you want to handle

    var snakeDirection = KEY.DOWN;
    for (var i = 0; i < snake.length; i++){
        snake[i].x = calcOffset(START_COLUMN);
        snake[i].y = calcOffset(START_ROW);
    }

    $('#gameOver').hide();

    $score.css('left', (COLUMNS*TILE_SIZE-$('#score').width())/2);
    $score.css('top', (ROWS+2)*TILE_SIZE);
    $score.score = 0;

    resetApplePosition(0);

    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// CORE LOGIC ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    /* 
    On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
    by calling this function and executing the code inside.
    */
    function newFrame() {
        updateSnakePosition();
        drawSnake();
        checkWallCollision();
        checkAppleCollision();
        checkSnakeCollision();
        canInput = true;
    }
    
    /* 
    Called in response to events.
    */
    function handleKeyPressed(event) {
        if (!canInput){
            return;
        }
        if (event.keyCode === KEY.LEFT && snakeDirection !== KEY.RIGHT){
            snakeDirection = KEY.LEFT;
        }
        else if (event.keyCode === KEY.RIGHT && snakeDirection !== KEY.LEFT){
            snakeDirection = KEY.RIGHT;
        }
        else if (event.keyCode === KEY.UP && snakeDirection !== KEY.DOWN){
            snakeDirection = KEY.UP;
        }
        else if (event.keyCode === KEY.DOWN && snakeDirection !== KEY.UP){
            snakeDirection = KEY.DOWN;
        }
        canInput = false;
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    function checkAppleCollision(){
        if (snake[0].x === $apple.x &&
            snake[0].y === $apple.y){

                increaseScore();
                resetApplePosition(0);
                growSnake();
        }
    }

    function increaseScore(){
        $score.score++;
        $score.text($score.score);
    }

    function resetApplePosition(iter){
        if (iter >= CUTOFF){
            $('#gameOver').text("You Win!");
            endGame();
            return;
        }
        var testX = Math.floor(Math.random()*COLUMNS) * TILE_SIZE;
        var testY = Math.floor(Math.random()*ROWS) * TILE_SIZE;

        for (var i = 0; i < snake.length; i++){
            if (testX === snake[i].x && testY === snake[i].y){
                resetApplePosition(iter+1);
                return;
            }
        }
        $apple.x = testX;
        $apple.y = testY;
        $apple.css('left', testX);
        $apple.css('top', testY);
    }

    function growSnake(){
        var $snakePiece = $('<div>').addClass('snakeBody');
        $('#board').append($snakePiece);
    
        $snakePiece.x = snake[snake.length-1].x;
        $snakePiece.y = snake[snake.length-1].y;
        $snakePiece.css('left', $snakePiece.x);
        $snakePiece.css('top', $snakePiece.y);

        snake.push($snakePiece);
    }

    function checkWallCollision(){
        if (snake[0].x < 0 || 
            snake[0].x >= COLUMNS * TILE_SIZE ||
            snake[0].y < 0 ||
            snake[0].y >= ROWS * TILE_SIZE){
            
                endGame();
        }
    }

    function checkSnakeCollision(){
        for (var i = 1; i < snake.length; i++){
            if (snake[0].x === snake[i].x && 
                snake[0].y === snake[i].y){
                
                    endGame();
            }
        }
    }

    function drawSnake(){
        for (var i = 0; i < snake.length; i++){
            snake[i].css('left', snake[i].x);
            snake[i].css('top', snake[i].y);
        }
        
    }

    function updateSnakePosition(){
        updateSnakeBody();
        updateSnakeHead();
    }

    function updateSnakeBody(){
        for (var i = snake.length-1; i > 0; i--){
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }
    }

    function updateSnakeHead(){
        if (snakeDirection === KEY.DOWN){
            snake[0].y += TILE_SIZE;
        }
        else if (snakeDirection === KEY.UP){
            snake[0].y -= TILE_SIZE;
        }
        if (snakeDirection === KEY.RIGHT){
            snake[0].x += TILE_SIZE;
        }
        else if (snakeDirection === KEY.LEFT){
            snake[0].x -= TILE_SIZE;
        }
    }

    function calcOffset(blockOffset){
        return blockOffset * TILE_SIZE;
    }
    
    function endGame() {
        // stop the interval timer
        clearInterval(interval);
        $('#gameOver').show();

        // turn off event handlers
        $(document).off();
    }
  
}
