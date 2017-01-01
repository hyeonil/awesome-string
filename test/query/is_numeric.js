import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('isNumeric', function() {

  it('should return true for a number', function() {
    expect(as.isNumeric(0)).to.be.true;
    expect(as.isNumeric(+0)).to.be.true;
    expect(as.isNumeric(1000)).to.be.true;
    expect(as.isNumeric(-1000)).to.be.true;
    expect(as.isNumeric(0xFF)).to.be.true;
    expect(as.isNumeric(1.56)).to.be.true;
    expect(as.isNumeric(-10.888)).to.be.true;
    expect(as.isNumeric(125e5)).to.be.true;
    expect(as.isNumeric(125e-3)).to.be.true;
  });

  it('should return true for a numeric string', function() {
    expect(as.isNumeric('0')).to.be.true;
    expect(as.isNumeric('+0')).to.be.true;
    expect(as.isNumeric('0.0')).to.be.true;
    expect(as.isNumeric('1000')).to.be.true;
    expect(as.isNumeric('-1000')).to.be.true;
    expect(as.isNumeric('0xFF')).to.be.true;
    expect(as.isNumeric('1.56')).to.be.true;
    expect(as.isNumeric('-10.888')).to.be.true;
    expect(as.isNumeric('125e5')).to.be.true;
    expect(as.isNumeric('125e-3')).to.be.true;
  });

  it('should return true for a numeric string representation of an object', function() {
    expect(as.isNumeric([0])).to.be.true;
    expect(as.isNumeric(['0'])).to.be.true;
    expect(as.isNumeric(['0.0'])).to.be.true;
    expect(as.isNumeric({
      toString: function() {
        return '100';
      }
    })).to.be.true;
  });

  it('should return false for a non numeric string', function() {
    expect(as.isNumeric('FF')).to.be.false;
    expect(as.isNumeric('0FF')).to.be.false;
    expect(as.isNumeric('Hello World!')).to.be.false;
    expect(as.isNumeric('!0')).to.be.false;
    expect(as.isNumeric('1.0 0')).to.be.false;
    expect(as.isNumeric('Infinity')).to.be.false;
    expect(as.isNumeric('NaN')).to.be.false;
    expect(as.isNumeric(' ')).to.be.false;
    expect(as.isNumeric(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non numeric string representation of an object', function() {
    expect(as.isNumeric(['Hello World!'])).to.be.false;
    expect(as.isNumeric({
      toString: function() {
        return 'NaN';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(as.isNumeric(true)).to.be.false;
    expect(as.isNumeric(false)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(as.isNumeric(undefined)).to.be.false;
    expect(as.isNumeric()).to.be.false;
  });

  it('should return false for a null', function() {
    expect(as.isNumeric(null)).to.be.false;
  });

  it('should return false for an Inifinty', function() {
    expect(as.isNumeric(null)).to.be.false;
  });

  it('should return false for a NaN', function() {
    expect(as.isNumeric(null)).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(as.isNumeric('')).to.be.false;
  });

});