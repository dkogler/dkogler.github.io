const
    _ = require("lodash"),
    expect = require('chai').expect,
    sinon = require('sinon'),
    path = '../data',
    pathData = '../data',
    pathFunctions = '../functions';

describe("#data", function () {
    beforeEach(function () {
        sinon.spy(console, 'log');
    });

    afterEach(function () {
        console.log.restore();
    });

    const data = require(path);

    describe("Part 1, Step 1: Object Creation", function () {
        const animal = data.animal;
        it('animal should be an Object!', function () {
            expect(animal).to.be.an('object');
        });
        it('animal.species should be assigned to a String!', function () {
            expect(animal.species).to.be.a('string');
        });
        it('animal.name should be assigned to a String!', function () {
            expect(animal.name).to.be.a('string');
        });
        it('animal.name should be assigned to an Array!', function () {
            expect(animal.noises).to.be.an('array');
        });
    });

    describe("Part 1, Step 2: Array Creation", function () {
        const noises = data.noises;
        it('noises should be an Array!', function () {
            expect(noises).to.be.an('array');
        });
    });

    describe("Part 1, Step 3: Combining Step 1 and Step 2", function () {
        const animal = data.animal;
        it('animal.noises should be assigned to noises Array!', function () {
            expect(animal.noises).to.eql(data.noises);
        });
        it('animal.noises should have a length of 5!', function () {
            expect(animal.noises.length).to.equal(5);
        });
        it('animal.noises should be an Array of Strings!', function () {
            expect(animal.noises.length).to.exist;
            _.each(animal.noises, function (noise) {
                expect(noise).to.be.a('string');
            });
        });
    });

    describe("Part 1, Step 6: A Collection of Animals", function () {
        const animals = data.animals;
        it('animals should be an Array!', function () {
            expect(animals).to.be.an('array');
        });
        it('animals should have a length of 4!', function () {
            expect(animals.length).to.equal(4);
        });
        it('each animal should have name, species and noises properties!', function () {
            expect(animals.length).to.exist;
            _.each(animals, function (animal) {
                expect(animal.name).to.be.a('string');
                expect(animal.species).to.be.a('string');
                expect(animal.noises).to.be.an('array');
            });
        });
    });

    describe("Part 1, Step 7 - Making Friends", function () {
        const friends = data.friends;
        it('friends should be an Array of Strings!', function () {
            expect(friends).to.be.an('array');
            _.each(friends, function (friend) {
                expect(friend).to.be.a('string');
            });
        });
        it('at least one animal should have a friends Array!', function () {
            const someArrayOfFriends = _.without(_.map(data.animals, 'friends'), undefined)[0];
            expect(someArrayOfFriends).to.be.an('array');
        });
        it('getRandom() should be a Function!', function () {
            const getRandom = data.getRandom;
            expect(getRandom).to.be.a('function');
        });
        it('getRandom() should use Math.random()!', function () {
            const getRandom = data.getRandom;
            sinon.spy(Math, 'random');
            getRandom(data.animals);
            expect(Math.random.calledOnce).to.be.true;
            Math.random.restore();
        });
        it('getRandom() should return a random index from an array!', function () {
            const getRandom = data.getRandom;
            expect(getRandom([1, 2, 3, 4])).to.be.within(0, 3);
        });
    });
});

describe("#functions", function () {
    beforeEach(function () {
        sinon.spy(console, 'log');
    });

    afterEach(function () {
        console.log.restore();
    });

    const
        data = require(pathData),
        functions = require(pathFunctions);

    describe("Part 2, Step 1: Search", function () {
        it('search() should return animal by name!', function () {
            const
                nameOne = data.animals[0].name,
                nameTwo = data.animals[1].name;
            expect(functions.search(data.animals, nameOne).name).to.equal(nameOne);
            expect(functions.search(data.animals, nameTwo).name).to.equal(nameTwo);
        });
        it('search() should return undefined on not found!', function () {
            expect(functions.search(data.animals, '_1904=-20zja-qkjsdfs=qweq!-')).to.be.null;
        });
    });

    describe("Part 2, Step 2: Replace", function () {
        it('replace() should overwrite animal where name matches!', function () {
            const
                name = data.animals[0].name,
                replacement = {
                    species: 'bird',
                    name: 'Flappy',
                    noises: ['chirp', 'tweet', 'flutter']
                };
            expect(_.includes(data.animals, replacement)).to.be.false;
            functions.replace(data.animals, name, replacement);
            expect(_.includes(data.animals, replacement)).to.be.true;
        });
        it('replace() should not replace if name doesn\'t match!', function () {
            const
                cloned = data.animals.concat(),
                replacement = {
                    species: 'bird',
                    name: 'Flappy',
                    noises: ['chirp', 'tweet', 'flutter']
                };
            functions.replace(data.animals, '_1904=-20zja-qkjsdfs=qweq!-', replacement);
            expect(data.animals).to.eql(cloned);
        });
    });

    describe("Part 2, Step 3: Remove", function () {
        it('remove() should remove animal where name matches!', function () {
            const
                animal = data.animals[0],
                name = animal.name;
            expect(_.includes(data.animals, animal)).to.be.true;
            functions.remove(data.animals, name);
            expect(_.includes(data.animals, animal)).to.be.false;
        });
        it('remove() should not remove if name doesn\'t match!', function () {
            const length = data.animals.length;
            console.log(data.animals);
            functions.remove(data.animals, '_1904=-20zja-qkjsdfs=qweq!-');
            expect(data.animals.length).to.equal(length);
        });
    });

    describe("Part 2, Step 4: Add", function () {
        it('add() should add animal if no other animal shares name of new animal!', function () {
            const
                cloned = data.animals.concat(),
                added = {
                    species: 'bird',
                    name: '_1904=-20zja-qkjsdfs=qweq!-',
                    noises: ['chirp', 'tweet', 'flutter']
                };
            functions.add(data.animals, added);
            expect(_.includes(data.animals, added)).to.be.true;
        });
        it('add() should not add animal if other animal shares name of new animal!', function () {
            const
                name = data.animals[0].name,
                notAdded = {
                    species: 'bird',
                    name: name,
                    noises: ['chirp', 'tweet', 'flutter']
                };
            functions.add(data.animals, notAdded);
            expect(_.includes(data.animals, notAdded)).to.be.false;
        });
    });
});