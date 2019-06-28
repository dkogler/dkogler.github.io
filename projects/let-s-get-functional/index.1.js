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
  let count = 0;
  _.each(array, function(customer){
     count += customer.gender === "male" ? 1 : 0; 
  });
  return count;
};

var femaleCount = function(array) {
    let count = _.reduce(array, function(c, customer){
        return c + (customer.gender === "female" ? 1 : 0); 
    }, 0);
    return count;
//   let count = 0;
//   _.each(array, function(customer){
//      count += customer.gender === "female" ? 1 : 0; 
//   });
//   return count;
};

var oldestCustomer = function(array) {
  let oldest = array[0].name;
  let oldestAge = array[0].age;
  _.each(array, function(customer){
     if (customer.age > oldestAge){
         oldestAge = customer.age;
         oldest = customer.name;
     }
  });
  return oldest;
};

var youngestCustomer = function(array) {
  let youngest = array[0].name;
  let youngestAge = array[0].age;
  _.each(array, function(customer){
     if (customer.age < youngestAge){
         youngestAge = customer.age;
         youngest = customer.name;
     }
  });
  return youngest;
};

var averageBalance = function(array){
    let total = 0;
      _.each(array, function(customer){
     total += Number(customer.balance.replace(/[^0-9.-]+/g,"")); 
  });
  return total/array.length;
};

var firstLetterCount = function(array, letter){
    let match = _.filter(array, function(customer){
        return customer.name.toUpperCase()[0] === letter.toUpperCase();
    });
    
    return match.length;
};

var friendFirstLetterCount = function(array, customer, letter){
    let nameList = _.pluck(array, "name");
    let friends = array[_.indexOf(nameList, customer)].friends;
    
    let match = _.filter(friends, function(customer){
        return customer.name.toUpperCase()[0] === letter.toUpperCase();
    });
    
    return match.length;
};

var friendsCount = function(array, name){
    let match = _.filter(array, function(customer){
        return _.contains(_.pluck(customer.friends, "name"), name);
    });
    
    return _.pluck(match, "name");
};

var topThreeTags = function(array){
    let tagList = [];
    
    _.each(array, function(customer){
        _.each(customer.tags, function(tag){
            let where = _.indexOf(_.pluck(tagList, "tag"), tag);
            
            if (where === -1) {
                tagList.push({"tag": tag, "count": 1});
            }
            else{
                tagList[where].count++;
            }
        })
    });
    
    tagList.sort(function(a, b){
       return b.count - a.count;
    });
    
    return _.pluck(_.first(tagList, 3), "tag");
};

var genderCount = function(array){
    let genderList = {
        "male": 0,
        "female": 0,
        "transgender": 0
    };
    
    return _.reduce(array, function (list, customer) {
        list[customer.gender]++;
        return list;
    }, genderList);
    // _.each(array, function(customer){
    //     genderList[customer.gender]++;
    // });
    
    // return genderList;
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
