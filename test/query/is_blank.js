import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('isBlank', function() {

  it('should return false for a non empty string', function() {
    expect(as.isBlank('Hello World!')).to.be.false;
    expect(as.isBlank('a')).to.be.false;
    expect(as.isBlank(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function() {
    expect(as.isBlank(['Hello world'])).to.be.false;
    expect(as.isBlank({
      toString: function() {
        return 'Welcome to New York';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(as.isBlank(true)).to.be.false;
    expect(as.isBlank(false)).to.be.false;
  });

  it('should return false for a number', function() {
    expect(as.isBlank(0)).to.be.false;
    expect(as.isBlank(100)).to.be.false;
    expect(as.isBlank(-1.5)).to.be.false;
  });

  it('should return true for an empty string', function() {
    expect(as.isBlank('')).to.be.true;
  });

  it('should return true for a string with whitespaces', function() {
    expect(as.isBlank(' ')).to.be.true;
    expect(as.isBlank('   ')).to.be.true;
    expect(as.isBlank(' \n  ')).to.be.true;
    expect(as.isBlank('\f\n\r\t\v')).to.be.true;
  });

  it('should return true for an empty string string representation of an object', function() {
    expect(as.isBlank(['\n\n'])).to.be.true;
    expect(as.isBlank({
      toString: function() {
        return ' ';
      }
    })).to.be.true;
  });

  it('should return true for an undefined', function() {
    expect(as.isBlank(undefined)).to.be.true;
    expect(as.isBlank()).to.be.true;
  });

  it('should return true for a null', function() {
    expect(as.isBlank(null)).to.be.true;
  });

});