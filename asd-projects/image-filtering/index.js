// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(reddify);
    //applyFilter(decreaseBlue);
    //applyFilter(increaseGreenByBlue);
    applyFilterNoBackground(reddify);
    applyFilterNoBackground(decreaseBlue);
    //applyFilterNoBackground(blackAndWhite);

    applyFilterSmudgeLeft(smudge);



    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO: Create the applyFilter function here
function applyFilter(filterFunction) {
    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            var rgbString = image[i][j]; //grabs the string from the 2D array.
            var rgbNumbers = rgbStringToArray(rgbString); //"red,green,blue" is what the string is now
            filterFunction(rgbNumbers); //the filter function called changes the value of the string. reddify would be "255, green, blue"
            var rgbString2 = rgbNumbers; //stores the new string
            image[i][j] = rgbArrayToString(rgbString2); //updates the 2D array with the new value
        }
    }
}
function applyFilterNoBackground(filterFunction) {
    var backgroundColor = image[0][0]; //grabs the top left corner of the image and assumes that is the background color.
    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            var rgbString = image[i][j]; //grabs the string from the 2D array.
            if (rgbString !== backgroundColor) {              //checks if rgbString is not equal to background color, if it is the function does not run
                var rgbNumbers = rgbStringToArray(rgbString); //"red,green,blue" is what the string is now
                filterFunction(rgbNumbers); //the filter function called changes the value of the string. reddify would be "255, green, blue"
                var rgbString2 = rgbNumbers; //stores the new string
                image[i][j] = rgbArrayToString(rgbString2); //updates the 2D array with the new value
            }
        }
    }
}



// TODO: Create the applyFilterNoBackground function


// TODO: Create filter functions

//simply makes the red value 255
function reddify(array) {
    array[RED] = 255;
}
//decreases the blue value by 50
function decreaseBlue(array) {
    var blue = Math.max(0, array[BLUE] - 50); //This variable stores what the value of blue - 50 is, if it is less than 0, then the value is 0
    array[BLUE] = blue; //sets the value of blue to the variable's value.
}
//increases green by the value of blue.
function increaseGreenByBlue(array) {
    array[GREEN] = array[GREEN] + array[BLUE]; //this adds the blue value to green
    array[GREEN] = Math.min(255, array[GREEN]); //this makes sure that value is not over 255
}


// CHALLENGE code goes below here

function applyFilterSmudgeDown(filterFunction) {
    for (var i = 1; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            var rgbString = image[i][j]; //grabs the string from the 2D array.
            var neighbor = rgbStringToArray(image[i-1][j]);
            var rgbNumbers = rgbStringToArray(rgbString); //"red,green,blue" is what the string is now
            filterFunction(rgbNumbers, neighbor); //the filter function called changes the value of the string. reddify would be "255, green, blue"
            var rgbString2 = rgbNumbers; //stores the new string
            image[i][j] = rgbArrayToString(rgbString2); //updates the 2D array with the new value
        }
    }
}

function applyFilterSmudgeUp(filterFunction) {
    for (var i = 0; i < image.length-1; i++) {
        for (var j = 0; j < image[i].length; j++) {
            var rgbString = image[i][j]; //grabs the string from the 2D array.
            var neighbor = rgbStringToArray(image[i+1][j]);
            var rgbNumbers = rgbStringToArray(rgbString); //"red,green,blue" is what the string is now
            filterFunction(rgbNumbers, neighbor); //the filter function called changes the value of the string. reddify would be "255, green, blue"
            var rgbString2 = rgbNumbers; //stores the new string
            image[i][j] = rgbArrayToString(rgbString2); //updates the 2D array with the new value
        }
    }
}

function applyFilterSmudgeLeft(filterFunction) {
    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length-1; j++) {
            var rgbString = image[i][j]; //grabs the string from the 2D array.
            var neighbor = rgbStringToArray(image[i][j+1]);
            var rgbNumbers = rgbStringToArray(rgbString); //"red,green,blue" is what the string is now
            filterFunction(rgbNumbers, neighbor); //the filter function called changes the value of the string. reddify would be "255, green, blue"
            var rgbString2 = rgbNumbers; //stores the new string
            image[i][j] = rgbArrayToString(rgbString2); //updates the 2D array with the new value
        }
    }
}

function applyFilterSmudgeRight(filterFunction) {
    for (var i = 0; i < image.length; i++) {
        for (var j = 1; j < image[i].length; j++) {
            var rgbString = image[i][j]; //grabs the string from the 2D array.
            var neighbor = rgbStringToArray(image[i][j-1]);
            var rgbNumbers = rgbStringToArray(rgbString); //"red,green,blue" is what the string is now
            filterFunction(rgbNumbers, neighbor); //the filter function called changes the value of the string. reddify would be "255, green, blue"
            var rgbString2 = rgbNumbers; //stores the new string
            image[i][j] = rgbArrayToString(rgbString2); //updates the 2D array with the new value
        }
    }
}

function smudge(array, neighbor){
    array[RED] = (array[RED] + neighbor[RED])/2;
    array[BLUE] = (array[BLUE] + neighbor[BLUE])/2;
    array[GREEN] = (array[GREEN] + neighbor[GREEN])/2;
}