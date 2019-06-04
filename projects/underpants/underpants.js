// This makes the arguments variable behave the way we want it to and a few
// other things. For more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

var _ = {};


/**
* START OF OUR LIBRARY!
* Implement each function below it's instructions
*/

/** _.identity
* Arguments:
*   1) Any value
* Objectives:
*   1) Returns <value> unchanged
* Examples:
*   _.identity(5) === 5
*   _.identity({a: "b"}) === {a: "b"}
*/

_.identity = function (value) {
    return value;
};

/** _.typeOf
* Arguments:
*   1) Any value
* Objectives:
*   1) Return the type of <value> as a string
*       Types are one of:
*          - "string"
*          - "array"
*          - "object"
*          - "undefined"
*          - "number"
*          - "boolean"
*          - "null"
*          - "function"
* Examples:
* _.typeOf(134) -> "number"
* _.typeOf("javascript") -> "string"
* _.typeOf([1,2,3]) -> "array"
*/

_.typeOf = function (value) {
    if (value === null) {
        return "null";
    }
    else if (value === undefined){
        return "undefined";
    }
    else if (Array.isArray(value)){
        return "array";
    }
    else {
        return typeof value;
    }
};

/** _.first
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the first element in <array>.
*   3) Otherwise, return the first <number> items of <array>
* Edge Cases:
*   1) What if <number> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.first("ponies", 1) -> []
*   _.first(["a", "b", "c"], "ponies") -> "a"
*   _.first(["a", "b", "c"], 1) -> "a"
*   _.first(["a", "b", "c"], 2) -> ["a", "b"]
*/

_.first = function(arr, num) {
    if (!Array.isArray(arr)) {
        return [];
    }
    if (typeof num !== "number") {
        return arr[0];
    }
    var newArr = [];
    if (num > arr.length){
        num = arr.length;
    }
    for (var i = 0; i < num; i++){
        newArr.push(arr[i]);
    }
    return newArr;
};

/** _.last
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the last element in <array>.
*   3) Otherwise, return the last <number> items of <array>
* Edge Cases:
*   1) What if <number> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.last("ponies", 2) -> []
*   _.last(["a", "b", "c"], "ponies") -> "c"
*   _.last(["a", "b", "c"], 1) -> "c"
*   _.last(["a", "b", "c"], 2) -> ["b", "c"]
*/

_.last = function(arr, num) {
    if (!Array.isArray(arr)) {
        return [];
    }
    if (typeof num !== "number") {
        return arr[arr.length-1];
    }
    var newArr = [];
    if (num > arr.length){
        num = arr.length;
    }
    for (var i = arr.length-num; i < arr.length; i++){
        newArr.push(arr[i]);
    }
    return newArr;
};

/** _.indexOf
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return the index of <array> that is the first occurrance of <value>
*   2) Return -1 if <value> is not in <array>
*   3) Do not use [].indexOf()!
* Edge Cases:
*   1) What if <array> has multiple occurances of val?
*   2) What if <val> isn't in <array>?
* Examples:
*   _.indexOf(["a","b","c"], "c") -> 2
*   _.indexOf(["a","b","c"], "d") -> -1
*/

_.indexOf = function (arr, val) {
    if (!Array.isArray(arr)){
        return -1;
    }
    for (var i = 0; i < arr.length; i++){
        if (val === arr[i]){
            return i;
        }
    }
    return -1;
};

/** _.contains
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
*   3) You must use the ternary operator in your implementation.
* Edge Cases:
*   1) did you use === ?
*   2) what if no <value> is given?
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
*/

_.contains = function (arr, val) {
    if (!Array.isArray(arr)){
        return false;
    }
    for (var i = 0; i < arr.length; i++){
        if (val === arr[i]){
            return true;
        }
    }
    return false;
};

/** _.each
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) if <collection> is an array, call <function> once for each element
*      with the arguments:
*         the element, it's index, <collection>
*   2) if <collection> is an object, call <function> once for each property
*      with the arguments:
*         the property's value, it's key, <collection>
* Examples:
*   _.each(["a","b","c"], function(e,i,a){ console.log(e)});
*      -> should log "a" "b" "c" to the console
*/

_.each = function (col, fun) {
    if (typeof col === 'object'){
        for (var entry in col){
            fun(col[entry], entry, col);
        }
    }
    return col;
};

/** _.unique
* Arguments:
*   1) An array
* Objectives:
*   1) Return a new array of all elements from <array> with duplicates removed
*   2) Use _.indexOf() from above
* Examples:
*   _.unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
*/

_.unique = function (arr) {
    var out = [];
    for (var i = 0; i < arr.length; i++) {
        if (_.indexOf(arr, arr[i]) === i){
            out.push(arr[i]);
        }
    }
    return out;
};

/** _.filter
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned true
* Edge Cases:
*   1) What if <function> returns something other than true or false?
* Examples:
*   _.filter([1,2,3,4,5], function(x){return x%2 === 0}) -> [2,4]
* Extra Credit:
*   use _.each in your implementation
*/

_.filter = function (arr, fun) {
    var results = [];
    function retFun (el, i, arr) {
        results.push(fun(el, i, arr));
    }
    _.each(arr, retFun);
    var out = [];
    for (var i in arr) {
        if (results[i]) {
            out.push(arr[i]);
        }
    }
    return out;
};

/** _.reject
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned false
*   3) This is the logical inverse if _.filter(), you must use _.filter() in your implementation
* Examples:
*   _.reject([1,2,3,4,5], function(e){return e%2 === 0}) -> [1,3,5]
*/

_.reject = function (arr, fun) {
    var okay = _.filter(arr, fun);
    var out = [];
    var j = 0;
    for (var i in arr) {
        if (arr[i] != okay[j]) {
            out.push(arr[i]);
        }
        else {
            j++;
        }
    }
    return out;
};

/** _.partition
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) Call <function> for each element in <array> passing it the arguments:
*       element, key, <array>
*   2) Return an array that is made up of 2 sub arrays:
*       0) An array that contains all the values for which <function> returned something truthy
*       1) An array that contains all the values for which <function> returned something falsy
* Edge Cases:
*   1) This is going to return an array of arrays.
* Examples:
*   _.partition([1,2,3,4,5], function(element,index,arr){
*     return element % 2 === 0;
*   }); -> [[2,4],[1,3,5]]
}
*/

_.partition = function (arr, fun) {
    return [_.filter(arr, fun), _.reject(arr, fun)];
};

/** _.map
* Arguments:
*   1) A collection
*   2) a function
* Objectives:
*   1) call <function> for each element in <collection> passing the arguments:
*        if <collection> is an array:
*            the element, it's index, <collection>
*        if <collection> is an object:
*            the value, it's key, <collection>
*   2) save the return value of each <function> call in a new array
*   3) return the new array
* Examples:
*   _.map([1,2,3,4], function(e){return e * 2}) -> [2,4,6,8]
*/

_.map = function (col, fun) {
    var ret = [];
    for (var entry in col){
        ret.push(fun(col[entry], entry, col));
    }
    return ret;
};

/** _.pluck
* Arguments:
*   1) An array of objects
*   2) A property
* Objectives:
*   1) Return an array containing the value of <property> for every element in <array>
*   2) You must use _.map() in your implementation.
* Examples:
*   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/

_.pluck = function (arr, prop) {
    function getProp (val, entry, col){
        return val[prop];
    }
    return _.map(arr, getProp);
};

/** _.every
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*      if <collection> is an array:
*          current element, it's index, <collection>
*      if <collection> is an object:
*          current value, current key, <collection>
*   2) If the return value of calling <function> for every element is true, return true
*   3) If even one of them returns false, return false
*   4) If <function> is not provided, return true if every element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.every([2,4,6], function(e){return e % 2 === 0}) -> true
*   _.every([1,2,3], function(e){return e % 2 === 0}) -> false
*/

_.every = function (col, fun) {
    if (fun === undefined) {
        fun = function (val, entry, col) {
            return val;
        };
    }
    
    let res = true;
    let gather = function (val, entry, col) {
        if (!fun(val, entry, col)) {
            res = false;
        }
    };
    _.each(col, gather);
    return res;
    
    // if (res.contains)
    // for (var entry in col) {
    //     if (!fun(col[entry], entry, col)){
    //         return false;
    //     }
    // }
    // return true;
};


/** _.some
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*       if <collection> is an array:
*        current element, it's index, <collection>
*       if <collection> is an object:
*        current value, current key, <collection>
*   2) If the return value of calling <function> is true for at least one element, return true
*   3) If it is false for all elements, return false
*   4) If <function> is not provided return true if at least one element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.some([1,3,5], function(e){return e % 2 === 0}) -> false
*   _.some([1,2,3], function(e){return e % 2 === 0}) -> true
*/

_.some = function (col, fun) {
    if (fun === undefined) {
        fun = function (val, entry, col) {
            return val;
        };
    }
    for (var entry in col) {
        if (fun(col[entry], entry, col)){
            return true;
        }
    }
    return false;
};

/** _.reduce
* Arguments:
*   1) An array
*   2) A function
*   3) A seed
* Objectives:
*   1) Call <function> for every element in <collection> passing the arguments:
*         previous result, element, index
*   2) Use the return value of <function> as the "previous result"
*      for the next iteration
*   3) On the very first iteration, use <seed> as the "previous result"
*   4) If no <seed> was given, use the first element/value of <collection> as <seed> and continue to the next element
*   5) After the last iteration, return the return value of the final <function> call
* Edge Cases:
*   1) What if <seed> is not given?
* Examples:
*   _.reduce([1,2,3], function(previousSum, currentValue, currentIndex){ return previousSum + currentValue }, 0) -> 6
*/

_.reduce = function(arr, fun, seed) {
    var last = seed;
    var i = 0;
    if (seed === undefined){
        last = arr[i++];
    }
    for (; i < arr.length; i++){
        last = fun(last, arr[i], i);
    }
    return last;
};

/** _.extend
* Arguments:
*   1) An Object
*   2) An Object
*   ...Possibly more objects
* Objectives:
*   1) Copy properties from <object 2> to <object 1>
*   2) If more objects are passed in, copy their properties to <object 1> as well, in the order they are passed in.
*   3) Return the update <object 1>
* Examples:
*   var data = {a:"one"};
*   _.extend(data, {b:"two"}); -> data now equals {a:"one",b:"two"}
*   _.extend(data, {a:"two"}); -> data now equals {a:"two"}
*/

_.extend = function () {
    var obj = arguments[0];
    for (var i = 1; i < arguments.length; i++){
        for (var key in arguments[i]){
            obj[key] = arguments[i][key];
        }
    }
    return obj;
};

/******************************************************************************/

_.defaults = function (obj, defaults) {
    for (var key in defaults) {
        if (obj[key] === undefined){
            obj[key] = defaults[key];
        }
    }
    return obj;
};

_.once = function (fun) {
    var result;
    var ran = false;
    return function () {
        if (!ran) {
            result = fun.apply(this, arguments);
            ran = true;
        }

        return result;
    };
};

_.memoize = function (fun, hash) {
    if (hash === undefined){
        hash = function () { 
            return arguments[0];
        };
    }
    var results = {};
    return function () {
        var h = hash.apply(this, arguments);
        if (h in results) {
            return results[h];
        }
        results[h] = fun.apply(this, arguments);
        return results[h];
    };
};

_.delay = function (fun, wait, args) {
    return setTimeout(function () {
        return fun.apply(null, args);
    }, wait);
};

_.shuffle = function (arr) {
    var lastIndex = arr.length;
    var swapIndex, temp;
    
    while (lastIndex !== 0) {
        swapIndex = Math.floor(Math.random() * lastIndex);
        lastIndex--;
        
        temp = arr[swapIndex];
        arr[swapIndex] = arr[lastIndex];
        arr[lastIndex] = temp;
    }
    return arr;
};

/******************************************************************************/

_.invoke = function (list, fun, args) {
    return _.map(list, function () {
        var pass = arguments;
        
        if (Array.isArray(args)) {
            pass = pass.concat(args);
        }

        return fun.apply(null, pass);
    });
};

_.sortBy = function (arr, criteria) {

    if (typeof criteria === 'string') {
        return arr.sort(function (a, b) {
            return (a[criteria] - b[criteria]);
        });
    }
    else if (typeof criteria === 'function') {
        return _.pluck(_.map(arr, function (val, key, obj) {
            return {
                value: val,
                key: key,
                comp: criteria(val, key, obj)
            };
        }).sort(function (a, b) {
            return a.comp - b.comp;
        }), 'value');
    }
    
    return arr;
};

_.zip = function (arr) {
    var ret = [];
    var length = arguments[0].length;
    for (var j = 0; j < length; j++) {
        ret.push([]);
    }
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < length; j++) {
            ret[j].push(arguments[i][j]);
        }
    }
    return ret;
};

_.flatten = function (arr, shallow) {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            if (shallow === true) {
                ret = ret.concat(arr[i]);
            }
            else {
                ret = ret.concat(_.flatten(arr[i]));
            }
        }
        else {
            ret.push(arr[i]);
        }
    }
    return ret;
};

_.intersection = function (arr) {
    var ret = [];
    for (var i = 0; i < arguments[0].length; i++) {
        var found = true;
        var next = arguments[0][i];
        for (var j = 1; j < arguments.length; j++){
            found = false;
            for (var k = 0; k < arguments[j].length; k++){
                if (next === arguments[j][k]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                break;
            }
        }
        if (found) {
            ret.push(next);
        }
    }
    return ret;
};

_.difference = function (arr, other) {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        var found = false;
        var next = arr[i];
        for (var j = 1; j < arguments.length; j++){
            found = false;
            for (var k = 0; k < arguments[j].length; k++){
                if (next === arguments[j][k]) {
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        if (!found) {
            ret.push(next);
        }
    }
    return ret;
};

_.throttle = function (fun, wait) {
    var previous = 0, result;
    
    var throttled = function () {
        var now = new Date().getTime();
        
        var remaining = wait - (now - previous);
        if (remaining <= 0 || remaining > wait) {
            previous = now;
            result = fun.apply(this, arguments);
        }
        console.log(result);
        return result;
    };
    
    return throttled;
};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = _;
    module.exports.identity = _.identity;
    module.exports.typeOf = _.typeOf;
    module.exports.first = _.first;
    module.exports.last = _.last;
    module.exports.indexOf = _.indexOf;
    module.exports.contains = _.contains;
    module.exports.each = _.each;
    module.exports.unique = _.unique;
    module.exports.filter = _.filter;
    module.exports.reject = _.reject;
    module.exports.partition = _.partition;
    module.exports.map = _.map;
    module.exports.pluck = _.pluck;
    module.exports.every = _.every;
    module.exports.some = _.some;
    module.exports.reduce = _.reduce;
    module.exports.extend = _.extend;


}
