import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('countSubstrings', function() {

  it('should return the number of substring appearances in a string', function() {
    expect(as.countSubstrings('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
    expect(as.countSubstrings('And some Skittles', 'Skittles')).to.be.equal(1);
    expect(as.countSubstrings('And some Skittles', 'chocolate')).to.be.equal(0);
    expect(as.countSubstrings('******', '*')).to.be.equal(6);
    expect(as.countSubstrings('*******', '**')).to.be.equal(3);
    expect(as.countSubstrings('*******', '**-')).to.be.equal(0);
    expect(as.countSubstrings('*******', '***')).to.be.equal(2);
    expect(as.countSubstrings('*******', '****')).to.be.equal(1);
    expect(as.countSubstrings('*******', '********')).to.be.equal(0);
    expect(as.countSubstrings('*-*-*', '**')).to.be.equal(0);
    expect(as.countSubstrings('', '')).to.be.equal(0);
    expect(as.countSubstrings(PRINTABLE_ASCII, '#')).to.be.equal(1);
  });

  it('should return the number of appearances of a number in a number', function() {
    expect(as.countSubstrings(111222, 1)).to.be.equal(3);
    expect(as.countSubstrings(0, 0)).to.be.equal(1);
    expect(as.countSubstrings(15, 16)).to.be.equal(0);
  });

  it('should return the number of substring appearances in a string representation of an object', function() {
    expect(as.countSubstrings(['where-where-where'], 'where')).to.be.equal(3);
    expect(as.countSubstrings({
      toString: function() {
        return 'where-where-where';
      }
    }, 'where')).to.be.equal(3);
  });

  it('should return zero for undefined or null', function() {
    expect(as.countSubstrings()).to.be.equal(0);
    expect(as.countSubstrings(undefined)).to.be.equal(0);
    expect(as.countSubstrings(null)).to.be.equal(0);
    expect(as.countSubstrings(undefined, undefined)).to.be.equal(0);
    expect(as.countSubstrings(null, null)).to.be.equal(0);
  });

});