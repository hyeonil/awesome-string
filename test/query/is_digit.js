import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('isDigit', function() {

  it('should return true for a digit string', function() {
    expect(as.isDigit('0')).to.be.true;
    expect(as.isDigit('1000')).to.be.true;
    expect(as.isDigit('1234567890')).to.be.true;
    expect(as.isDigit('00')).to.be.true;
  });

  it('should return true for an array with one digit string item', function() {
    expect(as.isDigit(['00'])).to.be.true;
    expect(as.isDigit(['12'])).to.be.true;
    expect(as.isDigit(['1234567890'])).to.be.true;
  });

  it('should return true for a digit string representation of an object', function() {
    expect(as.isDigit({
      toString: function() {
        return '123';
      }
    })).to.be.true;
    expect(as.isDigit({
      toString: function() {
        return '567';
      }
    })).to.be.true;
    expect(as.isDigit({
      toString: function() {
        return '00';
      }
    })).to.be.true;
  });

  it('should return true for a positive integer number', function() {
    expect(as.isDigit(0)).to.be.true;
    expect(as.isDigit(1000)).to.be.true;
    expect(as.isDigit(0xFF)).to.be.true;
    expect(as.isDigit(0x1fffffffffffff)).to.be.true;
  });

  it('should return false for a boolean', function() {
    expect(as.isDigit(true)).to.be.false;
    expect(as.isDigit(false)).to.be.false;
  });

  it('should return false for a non-digit string', function() {
    expect(as.isDigit('hell0w0rld!')).to.be.false;
    expect(as.isDigit('hello world! 12')).to.be.false;
    expect(as.isDigit('\nhell0 w0rld!\n')).to.be.false;
    expect(as.isDigit('JavaScript 2015')).to.be.false;
    expect(as.isDigit('isAlpha(0)')).to.be.false;
    expect(as.isDigit('привет0мир!1200')).to.be.false;
    expect(as.isDigit('12.0')).to.be.false;
    expect(as.isDigit('-1')).to.be.false;
    expect(as.isDigit(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for an array with a non-digit string item', function() {
    expect(as.isDigit(['Hello 1000000 visitor'])).to.be.false;
    expect(as.isDigit(['0.0'])).to.be.false;
  });

  it('should return false for a non digit string representation of an object', function() {
    expect(as.isDigit({
      toString: function() {
        return 'Hello World! 007';
      }
    })).to.be.false;
    expect(as.isDigit({
      toString: function() {
        return 'Ява Скрипт, привет 0!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(as.isDigit(undefined)).to.be.false;
    expect(as.isDigit()).to.be.false;
  });

  it('should return false for a null', function() {
    expect(as.isDigit(null)).to.be.false;
  });

  it('should return false for a negative number or negative numeric string', function() {
    expect(as.isDigit(-12)).to.be.false;
    expect(as.isDigit(-100)).to.be.false;
    expect(as.isDigit(-12.05)).to.be.false;
    expect(as.isDigit('-1')).to.be.false;
    expect(as.isDigit('-12.05')).to.be.false;
  });

  it('should return false for float numbers', function() {
    expect(as.isDigit(0.5)).to.be.false;
    expect(as.isDigit(12.05)).to.be.false;
    expect(as.isDigit(100.001)).to.be.false;
  });

  it('should return false for an Infinity number', function() {
    expect(as.isDigit(Infinity)).to.be.false;
  });

  it('should return false for a NaN number', function() {
    expect(as.isDigit(NaN)).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(as.isDigit('')).to.be.false;
  });

});