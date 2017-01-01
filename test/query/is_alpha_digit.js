import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('isAlphaDigit', function() {

  it('should return true for an alpha and digit string', function() {
    expect(as.isAlphaDigit('HelloWorld')).to.be.true;
    expect(as.isAlphaDigit('HelloWorld007')).to.be.true;
    expect(as.isAlphaDigit('JavaScript6')).to.be.true;
    expect(as.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    expect(as.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789')).to.be.true;
    expect(as.isAlphaDigit('man\u0303ana')).to.be.true;
    expect(as.isAlphaDigit('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });


  it('should return true for a string with diacritics', function() {
    expect(as.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
    expect(as.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ0123456789')).to.be.true;
  });

  it('should return true for an array with one alpha and digit string item', function() {
    expect(as.isAlphaDigit(['HelloWorld'])).to.be.true;
    expect(as.isAlphaDigit(['HelloWorld007'])).to.be.true;
  });

  it('should return true for an alpha and digit string representation of an object', function() {
    expect(as.isAlphaDigit({
      toString: function() {
        return 'HelloWorld';
      }
    })).to.be.true;
    expect(as.isAlphaDigit({
      toString: function() {
        return 'Welcome';
      }
    })).to.be.true;
    expect(as.isAlphaDigit({
      toString: function() {
        return 'JavaScript2016';
      }
    })).to.be.true;
    expect(as.isAlphaDigit({
      toString: function() {
        return 'Welcome';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(as.isAlphaDigit(true)).to.be.true;
    expect(as.isAlphaDigit(false)).to.be.true;
  });

  it('should return true for a positive number or numeric string', function() {
    expect(as.isAlphaDigit(0)).to.be.true;
    expect(as.isAlphaDigit(10)).to.be.true;
    expect(as.isAlphaDigit(0xFF)).to.be.true;
    expect(as.isAlphaDigit('0')).to.be.true;
    expect(as.isAlphaDigit('10')).to.be.true;
    expect(as.isAlphaDigit('0xFF')).to.be.true;
    expect(as.isAlphaDigit(NaN)).to.be.true;
    expect(as.isAlphaDigit(Infinity)).to.be.true;
  });

  it('should return false for a non alpha and non digit string', function() {
    expect(as.isAlphaDigit('Hello World!')).to.be.false;
    expect(as.isAlphaDigit('Hello World! It is 2016.')).to.be.false;
    expect(as.isAlphaDigit('\nHello World!\n')).to.be.false;
    expect(as.isAlphaDigit('JavaScript 2015')).to.be.false;
    expect(as.isAlphaDigit(' ')).to.be.false;
    expect(as.isAlphaDigit('\n')).to.be.false;
    expect(as.isAlphaDigit('\t')).to.be.false;
    expect(as.isAlphaDigit(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non alpha and non digit string representation of an object', function() {
    expect(as.isAlphaDigit({
      toString: function() {
        return 'Hello World! How are you?';
      }
    })).to.be.false;
    expect(as.isAlphaDigit({
      toString: function() {
        return 'Hello World! How are you?';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(as.isAlphaDigit(undefined)).to.be.false;
    expect(as.isAlphaDigit()).to.be.false;
  });

  it('should return false for a null', function() {
    expect(as.isAlphaDigit(null)).to.be.false;
  });

  it('should return false for a negative number or numeric string', function() {
    expect(as.isAlphaDigit(-1)).to.be.false;
    expect(as.isAlphaDigit(-12.05)).to.be.false;
    expect(as.isAlphaDigit('-12.05')).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(as.isAlphaDigit('')).to.be.false;
  });

});
