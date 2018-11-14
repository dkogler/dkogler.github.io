/**
 * Part 1
 *
 * In this file, we're going to practice
 * creating and accessing data structues.
 *
 * See the README for detailed instructions,
 * and read every instruction carefully.
 */

//////////////////////////////////////////////////////////////////////
// Step 1 - Object Creation //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

var animal = {};
animal.species = "iguana";
animal["name"] = "Mi-Ma";
animal.noises = [];
console.log(animal);

//////////////////////////////////////////////////////////////////////
// Step 2 - Array Creation ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

var noises = [];
noises[0] = "huff";
noises.push("khh");
noises.unshift("mlem");
noises[noises.length] = "glomp";
console.log(noises.length);
console.log(noises[noises.length-1]);
console.log(noises);

//////////////////////////////////////////////////////////////////////
// Step 3 - Combining Step 1 and 2 ///////////////////////////////////
//////////////////////////////////////////////////////////////////////

animal["noises"] = noises;
animal.noises.push("scrtch");
console.log(animal);

/* *******************************************************************
 * Step 4 - Review
 *
 * 1. What are the different ways you can access properties on objects?
 *
 * 2. What are the different ways of accessing elements on arrays?
 *
 * *******************************************************************
 */

/* *******************************************************************
 * Step 5 - Take a Break!
 *
 * It's super important to give your brain and yourself
 * a rest when you can! Grab a drink and have a think!
 * For like 10 minutes, then, BACK TO WORK! :)
 * *******************************************************************
 */

//////////////////////////////////////////////////////////////////////
// Step 6 - A Collection of Animals //////////////////////////////////
//////////////////////////////////////////////////////////////////////

var animals = [];
animals.push(animal);
console.log(animals);
var duck = { 
    species: 'duck', 
    name: 'Jerome', 
    noises: ['quack', 'honk', 'sneeze', 'woosh'] 
}
animals.push(duck);
console.log(animals);
animals.push({species: 'toad', name: 'Slippy', noises: ['ropp', 'cheep']},
             {species: 'axolotl', name: "Momo", noises: ["shlurp", "blub"]});
console.log(animals);
console.log(animals.length);

//////////////////////////////////////////////////////////////////////
// Step 7 - Making Friends ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//use arrays because we only need a simple list
var friends = [];

function getRandom(list) {
    return Math.floor(Math.random()*list.length);
}

friends.push(animals[getRandom(animals)].name);
console.log(friends);
animals[0].friends = friends;
console.log(animals);

/**
 * Nice work! You're done Part 1. Pat yourself on the back and
 * move onto Part 2 in the file called "functions.js"
 */



//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
var animal, noises, animals, friends, getRandom;
if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
     module.exports.animal = animal || null;
     module.exports.noises = noises || null;
     module.exports.animals = animals || null;
     module.exports.friends = friends || null;
     module.exports.getRandom = getRandom || null;
}
