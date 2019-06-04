// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('lodown-dkogler');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./projects/let-s-get-functional
 */
var maleCount = function(array) {
    return _.filter(array, function(x){return x.gender === "male"}).length
};

var femaleCount = function(array) {
    var counter = [];
    function fem(x){
        if(x.gender === 'female') {
            counter.push(x);
        }
    }
    _.each(array,fem);
    return counter.length;
}
var oldestCustomer = function(arr) {
    var person;
    var big = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].age > big) {
            person = arr[i].name;
            big = arr[i].age;
        }
    }
    return person;
}

var youngestCustomer = function(arr) {
    var str = '';
    var q = arr[0].age;
    for(var i = 0; i < arr.length; i++) {
        if (q > arr[i].age) {
            q = arr[i].age;
            str = arr[i].name
        }
    }
    return str;
}

var averageBalance = function(array) {
    var all = 0;
    for(let i = 0; i < array.length; i++){
        all += parseFloat(array[i].balance.replace('$', '').replace(',',''));
    }
    return all / array.length;
};

var firstLetterCount = function(array, letter) {
    var all = 0;
    for(var i = 0; i < array.length; i++){
        if(array[i].name.toLowerCase().charAt(0) === letter.toLowerCase()){
            all++;
        }
    }
    return all;
};
var friendFirstLetterCount = function(array, customer, letter) {
    var index = 0;
    for(var i = 0; i < array.length; i++){
        if(array[i].name === customer){
            index = i;
            break;
        }
    }
    return firstLetterCount(array[index].friends, letter);
};
var friendsCount = function (array, name) {
    var array = [];
    for(var i = 0; i < array.length; i++){
        for(var j = 0 ; j < array[i].friends.length; j++){
            if(array[i].friends[j].name === name){
                array.push(array[i].name);
            }
        }
    }
    return array;
};
var topThreeTags = function(array){
    var com =[];
    var comm = [];
    for(var i = 1; i < array.length; i++){
        for(var j = 0; j < array[i].tags.length; j++){
            com.push(array[i].tags[j]);
        }
    }
    var  count = {};
    com.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    for(var key in count){
      if(count[key] === 3){
        comm.push(key);
      }
    }
    return comm;
};

var genderCount  = function(array){
    var gen ={
        "male" :0 ,
        "female" :0 ,
        "transgender" : 0
    };
    function check(x){
        if(x.gender === "male"){
            return gen.male++;
        }else if(x.gender === "female"){
            return gen.female++;
        }else{
            return gen.transgender++;
        }
    }
    _.filter(array, check);
    return gen;
};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;
