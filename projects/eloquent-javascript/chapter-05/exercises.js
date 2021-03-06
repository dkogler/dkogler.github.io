// /////////////////////////////////////////////////////////////////////////////
// flatten /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

function flatten(arr) {
  return arr.reduce(function(final, sub){
    return final.concat(sub);
  }, []);
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
  let scripts = [];
  for (var i = 0; i < string.length; i++) {
    scripts.push(characterScript(string.codePointAt(i)));
    console.log(string.codePointAt(i));
  }
  var direction = scripts.reduce(function(dir, next){
    return dir + (next !== null ? (next.direction === 'ltr' ? 1 : -1) : 0);
  }, 0);
  return direction >= 0 ? 'ltr': 'rtl';
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
