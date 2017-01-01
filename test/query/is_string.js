import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('isString', function() {

  it('should return true for a string', function() {
    expect(as.isString('Hello World!')).to.be.true;
    expect(as.isString('')).to.be.true;
    expect(as.isString('\n')).to.be.true;
    expect(as.isString(PRINTABLE_ASCII)).to.be.true;
  });

  it('should return false for a null', function() {
    expect(as.isString(null)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(as.isString(undefined)).to.be.false;
    expect(as.isString()).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(as.isString(true)).to.be.false;
    expect(as.isString(false)).to.be.false;
  });

  it('should return false for a number', function() {
    expect(as.isString(100)).to.be.false;
    expect(as.isString(-40)).to.be.false;
  });

  it('should return false for an object', function() {
    expect(as.isString([])).to.be.false;
    expect(as.isString({})).to.be.false;
    expect(as.isString(new Date)).to.be.false;
  });

});