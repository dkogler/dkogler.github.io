////////////////////////////////////////////////////////////////////////////////
// range ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function range(start, stop, step = 1) {
  let ret = [];
  if (step <= 0 || start === stop){
    return ret;
  }
  for (var i = start; i <= stop; i += step){
    ret.push(i);
  }
  return ret;
}

////////////////////////////////////////////////////////////////////////////////
// sum /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function sum(arr) {
  let total = 0;
  for(let i = 0; i < arr.length; i++){
    total += arr[i];
  }
  return total;
}

////////////////////////////////////////////////////////////////////////////////
// reverseArray ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function reverseArray(array) {
  let ret = [];
  for (var i = 0; i < array.length; i++){
    ret.unshift(array[i]);
  }
  return ret;
}

////////////////////////////////////////////////////////////////////////////////
// reverseArrayInPlace /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function reverseArrayInPlace(arr) {
  let temp;
  let half = Math.floor(arr.length / 2);
  for (let i = 0; i < half; i++){
    temp = arr[i];
    arr[i] = arr[arr.length - i - 1];
    arr[arr.length-1-i] = temp;
  }
}

////////////////////////////////////////////////////////////////////////////////
// arrayToList /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function arrayToList(arr) {
  let rest = {
    value: arr[arr.length-1],
    rest: null
  }
  for (var i = arr.length - 2; i >= 0; i--){
    rest = {
      value: arr[i],
      rest: rest
    }
  }
  return rest;
}

////////////////////////////////////////////////////////////////////////////////
// listToArray /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function listToArray(list) {
  let arr = [list.value];
  let rest = list.rest;
  while (rest !== null){
    arr.push(rest.value);
    rest = rest.rest;
  }
  return arr;
}

////////////////////////////////////////////////////////////////////////////////
// prepend /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function prepend(val, list) {
  let newList = {
    value: val,
    rest: list
  }
  return newList;
}

////////////////////////////////////////////////////////////////////////////////
// nth /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function nth(list, n) {
  let count = 1;
  if (n === 0) {
    return list.value;
  }
  let rest = list.rest;
  while (count < n && rest !== null){
    rest = rest.rest;
    count++;
  }
  if (count === n && rest !== null){
    return rest.value;
  }
  return undefined;
}

////////////////////////////////////////////////////////////////////////////////
// deepEqual ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function deepEqual(a, b) {
  if (typeof a !== typeof b){
    return false;
  }
  if (typeof a !== "object"){
    return a === b;
  }
  if (a === null && b === null){
    return true;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b)){
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++){
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (let i = 0; i < aKeys.length; i++){
    if (!deepEqual(a[aKeys[i]], b[aKeys[i]])){
      return false;
    }
  }
  return true;
}

////////////////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

if ((typeof process !== 'undefined') &&
  (typeof process.versions.node !== 'undefined')) {
  module.exports = {
    range,
    sum,
    reverseArray,
    reverseArrayInPlace,
    arrayToList,
    listToArray,
    prepend,
    nth,
    deepEqual,
  };
};
