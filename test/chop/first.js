import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('first', function() {

  it('should return the first part of a string', function() {
    expect(as.first('Good day', -1)).to.be.equal('');
    expect(as.first('Good day', 0)).to.be.equal('');
    expect(as.first('Good day', 4)).to.be.equal('Good');
    expect(as.first('Good day', 1)).to.be.equal('G');
    expect(as.first('Good day', 8)).to.be.equal('Good day');
    expect(as.first('Good day', 1000)).to.be.equal('Good day');
    expect(as.first('Good day')).to.be.equal('G');
    expect(as.first('', 5)).to.be.equal('');
    expect(as.first('', 0)).to.be.equal('');
    expect(as.first('')).to.be.equal('');
    expect(as.first(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    expect(as.first(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[0]);
  });

  it('should return the first part of a string representation of an object', function() {
    expect(as.first(['Good evening'], 5)).to.be.equal('Good ');
    expect(as.first({
      toString: function() {
        return 'Morning';
      }
    }, 2)).to.be.equal('Mo');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.first()).to.be.equal('');
    expect(as.first(undefined)).to.be.equal('');
    expect(as.first(null)).to.be.equal('');
    expect(as.first(null, null)).to.be.equal('');
    expect(as.first(undefined, undefined)).to.be.equal('');
  });

});