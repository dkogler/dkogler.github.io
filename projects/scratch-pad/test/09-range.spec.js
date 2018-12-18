var
    expect = require('chai').expect;
    
describe("#range", function () {
    var homework = require('../day-3/homework/range');
    it('should return a range between the two input integers', function () {
        expect(homework.range(1, 5)).to.eql([1, 2, 3, 4, 5]);
    });
    it('should return a reversed range between the two input integers, if the start input is greater than the end input', function () {
        expect(homework.range(5, 1)).to.eql([5, 4, 3, 2, 1]);
    });
});
