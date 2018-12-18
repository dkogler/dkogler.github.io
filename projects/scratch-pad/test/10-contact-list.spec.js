var
    _ = require('lodash'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe("#contact-list", function () {
    var homework = require('../day-4/contact-list');
    describe('makeContact()', function() {
        it('should expose a Function called makeContact that returns an Object with structure: {id: \'1\', nameFirst: \'Max\', nameLast: \'Gaudin\'}', function () {
            expect(homework.makeContact('1', 'Max', 'Gaudin')).to.eql({
                id: '1',
                nameFirst: 'Max',
                nameLast: 'Gaudin'
            });
            expect(homework.makeContact('2', 'John', 'Fraboni')).to.eql({
                id: '2',
                nameFirst: 'John',
                nameLast: 'Fraboni',
            });
        });
    });

    describe('makeContactList()', function() {
        it('should expose a Function called makeContactList that returns an Object specialized for contact management', function () {
            var contacts = homework.makeContactList();
            expect(contacts).to.be.instanceof(Object);
        });
        it('should properly add a contact thru the addContact API', function () {
            var contacts = homework.makeContactList();
            contacts.addContact(homework.makeContact('1', 'Max', 'Gaudin'));
            expect(contacts.length()).to.equal(1);
            contacts.addContact(homework.makeContact('2', 'John', 'Fraboni'));
            expect(contacts.length()).to.equal(2);
        });
        it('should properly find a contact by full name thru the findContact API', function () {
            var contacts = homework.makeContactList();
            contacts.addContact(homework.makeContact('1', 'Max', 'Gaudin'));
            expect(contacts.findContact('Max Gaudin')).to.eql({
                id: '1',
                nameFirst: 'Max',
                nameLast: 'Gaudin'
            });
            expect(contacts.findContact('John Fraboni')).to.equal(undefined);
        });
        it('should properly remove a contact thru the removeContact API', function () {
            var contacts = homework.makeContactList();
            contacts.addContact(homework.makeContact('1', 'Max', 'Gaudin'));
            expect(contacts.length()).to.equal(1);
            contacts.addContact(homework.makeContact('2', 'Berta', 'Gaudin'));
            contacts.removeContact(contacts.findContact('Max Gaudin'));
            expect(contacts.length()).to.equal(1);
            contacts.removeContact(contacts.findContact('Berta Gaudin'));
            expect(contacts.length()).to.equal(0);
        });
        it('BONUS: should have an printAllContactNames API that returns new-line separated String of all full-names of contacts', function() {
            var contacts = homework.makeContactList();
            contacts.addContact(homework.makeContact('1', 'Max', 'Gaudin'));
            contacts.addContact(homework.makeContact('2', 'John', 'Fraboni'));
            expect(contacts.printAllContactNames()).to.equal('Max Gaudin\nJohn Fraboni');
            contacts.addContact(homework.makeContact('3', 'Olivia', 'Sabo-Rush'));
            expect(contacts.printAllContactNames()).to.equal('Max Gaudin\nJohn Fraboni\nOlivia Sabo-Rush');
        });
    });
});
