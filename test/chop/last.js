import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('last', function() {

  it('should return the last part of a string', function() {
    expect(as.last('Good day', -1)).to.be.equal('');
    expect(as.last('Good day', 0)).to.be.equal('');
    expect(as.last('Good day', 4)).to.be.equal(' day');
    expect(as.last('Good day', 1)).to.be.equal('y');
    expect(as.last('Good day', 8)).to.be.equal('Good day');
    expect(as.last('Good day', 1000)).to.be.equal('Good day');
    expect(as.last('Good day')).to.be.equal('y');
    expect(as.last('', 5)).to.be.equal('');
    expect(as.last('', 0)).to.be.equal('');
    expect(as.last('')).to.be.equal('');
    expect(as.last(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    expect(as.last(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[PRINTABLE_ASCII.length - 1]);
  });

  it('should return the last part of a string representation of an object', function() {
    expect(as.last(['Good evening'], 5)).to.be.equal('ening');
    expect(as.last({
      toString: function() {
        return 'Morning';
      }
    }, 2)).to.be.equal('ng');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.last()).to.be.equal('');
    expect(as.last(undefined)).to.be.equal('');
    expect(as.last(null)).to.be.equal('');
    expect(as.last(null, null)).to.be.equal('');
    expect(as.last(undefined, undefined)).to.be.equal('');
  });

});