var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var buildings = [];
        var coins = [];
        var buildingWidth = 540;
        var buildingSep = 20;
        var treeWidth = 400;
        var coinRadius = 90;
        var coinScale = 0.25;
        var coinSpeed = 5;

        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,ground.y,'midnightblue');
            background.addChild(backgroundFill);

            var lowerBackground = draw.rect(canvasWidth, canvasHeight-groundY-10, 'forestgreen');
            background.addChild(lowerBackground);
            lowerBackground.y = groundY+10;

            var coin;
            for (var i = 0; i < 64; i++){
                coin = draw.bitmap('img/coin.png');
                coin.x = Math.random()*canvasWidth;
                coin.y = groundY+10+Math.random()*(canvasHeight-groundY-10);
                coin.scaleX = coinScale;
                coin.scaleY = coinScale;
                coin.speedX = coinSpeed * (Math.random() > 0.5 ? -1 : 1);
                coin.speedY = coinSpeed * (Math.random() > 0.5 ? -1 : 1);
                background.addChild(coin);
                coins.push(coin);
            }
            
            // TODO: 3 - Add a moon and starfield
            var star;
            for (var i = 0; i < 128; i++){
                star = draw.rect(2, 2, 'white', 'yellow');
                star.x = Math.random()*canvasWidth;
                star.y = Math.random()*(ground.y-2);
                background.addChild(star);
            }
            
            var moon = draw.bitmap('img/gold-moon.png');
            moon.x = 50;
            moon.y = 25;
            moon.scaleX = 0.25;
            moon.scaleY = 0.25;
            background.addChild(moon);
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight = 942;
            var building;
            var buildingScale;
            var stretch = 0;
            var strike = 0;
            while (stretch < canvasWidth+buildingWidth+buildingSep) {
                buildingScale = Math.random()*0.4+0.1;
                if (stretch + buildingScale * buildingWidth > canvasWidth+buildingWidth){
                    if (strike++ > 4){
                        break;
                    }
                    continue;
                }
                building = draw.bitmap('img/golden-building.png');
                building.x = stretch;
                building.y = groundY-buildingHeight*buildingScale;
                building.scaleX = buildingScale;
                building.scaleY = buildingScale;
                background.addChild(building);
                buildings.push(building);
                stretch += buildingWidth*buildingScale + buildingSep;
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/golden-tree.png');
            tree.x = 200;
            tree.y = ground.y - 341;
            tree.scaleX = 0.4;
            tree.scaleY = 0.4;
            background.addChild(tree);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x--;
            if(tree.x < -treeWidth) {
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            var building;
            for (var i = 0; i < buildings.length; i++){
                building = buildings[i];
                building.x -= 0.5;
                if(building.x < -(buildingWidth+buildingSep)){
                    building.x = canvasWidth;
                }
            }

            var coin;
            for (var i = 0; i < coins.length; i++){
                coin = coins[i];
                coin.x += coin.speedX;
                coin.y += coin.speedY;

                if(coin.x < 0 || coin.x > canvasWidth){
                    coin.x -= coin.speedX;
                    coin.speedX *= -1;
                }
                if(coin.y < ground.y+10 || coin.y > canvasHeight){
                    coin.y -= coin.speedY;
                    coin.speedY *= -1;
                }
            }

        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
