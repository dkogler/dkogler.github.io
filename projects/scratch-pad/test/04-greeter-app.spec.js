var
    _ = require('lodash'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe("#greeter-app", function () {
    beforeEach(function () {
        sinon.spy(console, 'log');
    });

    afterEach(function () {
        console.log.restore();
    });
    var assignment = require('../day-2/greeter-app');
    it('should print Good Morning! if hour is between 0 and 11', function () {
        assignment.greeter(0);
        expect(console.log.firstCall.calledWith('Good Morning!')).to.be.true;
        assignment.greeter(11);
        expect(console.log.secondCall.calledWith('Good Morning!')).to.be.true;
        assignment.greeter(12);
        expect(console.log.thirdCall.calledWith('Good Morning!')).to.be.false;
    });
    it('should print Good Afternoon! if hour is between 12 and 16', function () {
        assignment.greeter(12);
        expect(console.log.firstCall.calledWith('Good Afternoon!')).to.be.true;
        assignment.greeter(16);
        expect(console.log.secondCall.calledWith('Good Afternoon!')).to.be.true;
        assignment.greeter(17);
        expect(console.log.thirdCall.calledWith('Good Afternoon!')).to.be.false;
        
    });
    it('should print Good Evening! if hour is between 17 and 21', function () {
        assignment.greeter(17);
        expect(console.log.firstCall.calledWith('Good Evening!')).to.be.true;
        assignment.greeter(21);
        expect(console.log.secondCall.calledWith('Good Evening!')).to.be.true;
        assignment.greeter(22);
        expect(console.log.thirdCall.calledWith('Good Evening!')).to.be.false;
    });
    it('should print Good Night! if hour is between 22 and 23', function () {
        assignment.greeter(22);
        expect(console.log.firstCall.calledWith('Good Night!')).to.be.true;
        assignment.greeter(23);
        expect(console.log.secondCall.calledWith('Good Night!')).to.be.true;
        assignment.greeter(0);
        expect(console.log.thirdCall.calledWith('Good Night!')).to.be.false;
    });
});
