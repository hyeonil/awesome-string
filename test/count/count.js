import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('count', function() {

  it('should return the number of characters in a string', function() {
    expect(as.count('rain')).to.be.equal(4);
    expect(as.count('')).to.be.equal(0);
    expect(as.count('rainbow')).to.be.equal(7);
    expect(as.count(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(as.count(123)).to.be.equal(3);
    expect(as.count(0)).to.be.equal(1);
    expect(as.count(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(as.count(['droplet'])).to.be.equal(7);
    expect(as.count({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(as.count()).to.be.equal(0);
    expect(as.count(null)).to.be.equal(0);
    expect(as.count(undefined)).to.be.equal(0);
  });

});