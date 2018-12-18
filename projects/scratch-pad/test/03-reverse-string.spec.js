var
    expect = require('chai').expect;

describe("#reverse-string", function () {
    var homework = require('../day-1/homework/reverse-string');
    it('should return the input String, reversed', function () {
        expect(homework.reverseString('hello')).to.equal('olleh');
        expect(homework.reverseString('goodbye')).to.equal('eybdoog');
    });
});