import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('charAt', function() {

  it('should return the character by index', function() {
    expect(as.charAt('Good day', 0)).to.be.equal('G');
    expect(as.charAt('Good day', 1)).to.be.equal('o');
    expect(as.charAt('Good day', 7)).to.be.equal('y');
    expect(as.charAt(PRINTABLE_ASCII, 0)).to.be.equal(' ');
    expect(as.charAt('', 0)).to.be.equal('');
    expect(as.charAt('Good day')).to.be.equal('G');
    expect(as.charAt('Good day', undefined)).to.be.equal('G');
    expect(as.charAt('Good day', null)).to.be.equal('G');
    expect(as.charAt('Good day', NaN)).to.be.equal('G');
  });

  it('should return an empty string for out of bounds index', function() {
    expect(as.charAt('Good day', -1)).to.be.equal('');
    expect(as.charAt('Good day', 100)).to.be.equal('');
  });

  it('should return the character by index of a string representation of an object', function() {
    expect(as.charAt(['Good evening'], 5)).to.be.equal('e');
    expect(as.charAt({
      toString: function() {
        return 'Morning';
      }
    }, 1)).to.be.equal('o');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.charAt()).to.be.equal('');
    expect(as.charAt(undefined)).to.be.equal('');
    expect(as.charAt(null)).to.be.equal('');
    expect(as.charAt(null, null)).to.be.equal('');
    expect(as.charAt(undefined, undefined)).to.be.equal('');
  });

});