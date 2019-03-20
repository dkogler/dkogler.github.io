(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    window.opspark.platform = window.opspark.platform || {};
    
    let platform = window.opspark.platform;
    
    /**
     * init: This function initializes the platforms for the level.
     * 
     * GOAL: Add as many platforms necessary to make your level challenging.
     * 
     * Use the platform.create() method to create platforms for the level. 
     * 
     * platform.create() takes these arguments:
     *      
     *      platform.create(x, y, scaleX, scaleY);
     * 
     *      x: The x coordineate for the platform.
     *      y: The y coordineate for the platform.
     *      scaleX: OPTIONAL The scale factor on the x-axis, this value will 
     *              stretch the platform in width.
     *      scaleY: OPTIONAL The scale factor on the y-axis, this value will 
     *              stretch the platform in height.
     */ 
    platform.init = function (game) {
        ////////////////////////////////////////////////////////////////////////
        // ALL YOUR CODE GOES BELOW HERE ///////////////////////////////////////
        
        /*
         * ground : here, we create a floor. Given the width of of the platform 
         * asset, giving it a scaleX and scaleY of 2 will stretch it across the 
         * bottom of the game.
         */
        platform.create(0, game.world.height - 32, 3, 2);

        // example:
        platform.create(150, 150, 1.47, 0.5);
        platform.create(600, 560, 1, 8);
        platform.create(160, 460, 1.5, 0.5);
        platform.create(160, 370, 0.8, 1.5);
        platform.create(430, 260, 0.5, 0.25);
        
        platform.create(630, 150, 0.05, 4);
        platform.create(720, 0, 0.05, 6);
        platform.create(150, 0, 0.05, 16);


        //platform.create(200, 280, 0.75);
        
        
        // ALL YOUR CODE GOES ABOVE HERE ///////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
    };
})(window);