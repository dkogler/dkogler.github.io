/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

////////////////////////////////////////////////////////////////////////
//////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
////////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort

async function bubbleSort(array){
    for (var i = 0; i < array.length; i++){
        for (var j = i+1; j < array.length; j++){
            if (array[i].value > array[j].value){
                swap(array, i, j);
                updateCounter(bubbleCounter);
                await sleep();
            }
        }
    }
}

// TODO 3: Implement quickSort

async function quickSort(array, left, right){
    console.log(left, right);
    if (right - left > 1){

        var index = await partition(array, left, right);

        if (left < index - 1){
            await quickSort(array, left, index - 1);
        }
        else {
            drawFinal(array, left, left);
        }

        if (index < right) {
            await quickSort(array, index, right);
        }
        else {
            drawFinal(array, right, right);
        }
    }
    drawFinal(array, left, right);

}

// TODOs 4 & 5: Implement partition

async function partition(array, left, right){
    let pivotIndex = Math.floor((left+right)/2);
    let pivot = array[pivotIndex].value;
    redrawChangePivot(array, left, right, pivotIndex);
    await sleep();

    while (left < right){
        while(array[left].value < pivot){
            left++;
            redrawChangeLeft(array, left, right);
            await sleep();
        }
        while(array[right].value > pivot){
            right--;
            redrawChangeRight(array, left, right);
            await sleep();
        }
        
        if (left < right){
            swap(array, left, right, pivotIndex);
            updateCounter(quickCounter);
        
            await sleep();
        }
    }

    if (left === right){
        left++;
    }

    return left;
}

// TODO 1: Implement swap
function swap(array, i, j, pv){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    drawSwap(array, i, j, pv);
}

////////////////////////////////////////////////////////////////////////
//////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
////////////////////////////////////////////////////////////////////////

const offset = 35.429;
const startOffset = -24;
///////////////////////////// HELPER FUNCTIONS /////////////////////////
function drawFinal(array, sleft, sright){
    for (var i = sleft; i <= sright; i++){
        $(array[i].id).css("background-color", "rgb(47, 79, 79)");
    }
}

function redrawChangePivot(array, left, right, pivot){
    $("#left").css("top", startOffset + Math.round(left*offset));
    $("#right").css("top", startOffset + Math.round(right*offset));
    $("#pivot").css("top", startOffset + Math.round(pivot*offset));

    for (var i = 0; i < array.length; i++){
        if ($(array[i].id).css("background-color") !== "rgb(47, 79, 79)"){
            $(array[i].id).css("background-color", "white");
        }
        $(array[i].id).css("border", "0px solid green");
    }
    $(array[left].id).css("background-color", "red");
    $(array[right].id).css("background-color", "blue");
    $(array[pivot].id).css("border", "2px groove green");
}

function redrawChangeLeft(array, left, right){
    //$("#left").css("top", startOffset + Math.round(left*offset));

    if (left === right){
        $(array[left].id).css("background-color", "lavender");
    }
    else{
        $(array[left].id).css("background-color", "red");
    }
    $(array[left-1].id).css("background-color", "white");

}

function redrawChangeRight(array, left, right){
    //$("#right").css("top", startOffset + Math.round(right*offset));

    if (left === right){
        $(array[left].id).css("background-color", "purple");
    }
    else{
        $(array[right].id).css("background-color", "blue");
    }
    $(array[right+1].id).css("background-color", "white");

}

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j, pv){
    let element1 = array[i];
    let element2 = array[j];


    let temp = $(element1.id).css("background-color");
    $(element1.id).css("background-color", $(element2.id).css("background-color"));
    $(element2.id).css("background-color", temp);

    temp = parseFloat($(element1.id).css("top")) + "px";
    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);

    if (i === pv){
        $("#pivot").css("top", startOffset + Math.round(j*offset));
    }
    else if (j === pv){
        $("#pivot").css("top", startOffset + Math.round(i*offset));
    }
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}