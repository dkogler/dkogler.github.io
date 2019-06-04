// /////////////////////////////////////////////////////////////////////////////
// flatten /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////
require('helpers.js');

function flatten(arr, shallow) {
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
          if (shallow === true) {
              ret = ret.concat(arr[i]);
          }
          else {
              ret = ret.concat(flatten(arr[i]));
          }
      }
      else {
          ret.push(arr[i]);
      }
  }
  return ret;
}


// /////////////////////////////////////////////////////////////////////////////
// loop ////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

function loop(init, stop, post, func) {
  for(let i = init; stop(i); i = post(i)){
    func(i);
  }
}

// /////////////////////////////////////////////////////////////////////////////
// every ///////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

function every(col, fun) {
    if (fun === undefined) {
        fun = function (val, entry, col) {
            return val;
        }
    }
    for (var entry in col) {
        if (!fun(col[entry], entry, col)){
            return false;
        }
    }
    return true;
}

// /////////////////////////////////////////////////////////////////////////////
// dominantDirection ///////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

function dominantDirection(string) {
  let results = [];
  for (let i = 0; i < string.length; i++){
    results.push(characterScript(string[i]));
  }
  console.log(results);
}

// /////////////////////////////////////////////////////////////////////////////
//  //////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

if ((typeof process !== 'undefined') &&
  (typeof process.versions.node !== 'undefined')) {
  module.exports = {
    flatten,
    loop,
    every,
    dominantDirection,
  };
};