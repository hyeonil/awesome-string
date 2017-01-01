import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('isEmpty', function() {

  it('should return true for an empty string', function() {
    expect(as.isEmpty('')).to.be.true;
  });

  it('should return true for an undefined', function() {
    expect(as.isEmpty(undefined)).to.be.true;
    expect(as.isEmpty()).to.be.true;
  });

  it('should return true for a null', function() {
    expect(as.isEmpty(null)).to.be.true;
  });

  it('should return false for a non empty string', function() {
    expect(as.isEmpty('Hello World!')).to.be.false;
    expect(as.isEmpty('a')).to.be.false;
    expect(as.isEmpty(' ')).to.be.false;
    expect(as.isEmpty(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function() {
    expect(as.isEmpty(['Hello world'])).to.be.false;
    expect(as.isEmpty({
      toString: function() {
        return ' ';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(as.isEmpty(true)).to.be.false;
    expect(as.isEmpty(false)).to.be.false;
  });

  it('should return false for a number', function() {
    expect(as.isEmpty(0)).to.be.false;
    expect(as.isEmpty(100)).to.be.false;
    expect(as.isEmpty(-1.5)).to.be.false;
  });

});