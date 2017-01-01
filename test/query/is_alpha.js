import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('isAlpha', function() {

  it('should return true for an alpha string', function() {
    expect(as.isAlpha('HelloWorld')).to.be.true;
    expect(as.isAlpha('JavaScript')).to.be.true;
    expect(as.isAlpha('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    expect(as.isAlpha('man\u0303ana')).to.be.true;
    expect(as.isAlpha('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });

  it('should return true for a string with diacritics', function() {
    expect(as.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for characters with diacritical marks', function() {
    expect(as.isAlpha('man\u0303ana')).to.be.true;
    expect(as.isAlpha('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });

  it('should return true for an array with one alpha string item', function() {
    expect(as.isAlpha(['HelloWorld'])).to.be.true;
  });

  it('should return true for an alpha string representation of an object', function() {
    expect(as.isAlpha({
      toString: function() {
        return 'HelloWorld';
      }
    })).to.be.true;
    expect(as.isAlpha({
      toString: function() {
        return 'HelloWorld';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(as.isAlpha(true)).to.be.true;
    expect(as.isAlpha(false)).to.be.true;
  });

  it('should return true for a NaN or Infinity number', function() {
    expect(as.isAlpha(NaN)).to.be.true;
    expect(as.isAlpha(Infinity)).to.be.true;
  });

  it('should return false for a non-alpha string', function() {
    expect(as.isAlpha('Hello World!')).to.be.false;
    expect(as.isAlpha('\nHello World!\n')).to.be.false;
    expect(as.isAlpha('ECMAScript 5.1 (ECMA-262)')).to.be.false;
    expect(as.isAlpha(' ')).to.be.false;
    expect(as.isAlpha('\n')).to.be.false;
    expect(as.isAlpha('\t')).to.be.false;
    expect(as.isAlpha('0123456789')).to.be.false;
    expect(as.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ 0123456789')).to.be.false;
    expect(as.isAlpha(PRINTABLE_ASCII)).to.be.false;
  });


  it('should return false for an array with a non-alpha string item', function() {
    expect(as.isAlpha(['Hello World!'])).to.be.false;
  });

  it('should return false for a non-alpha string representation of an object', function() {
    expect(as.isAlpha({
      toString: function() {
        return 'Hello World!';
      }
    })).to.be.false;
    expect(as.isAlpha({
      toString: function() {
        return 'Welcome!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(as.isAlpha(undefined)).to.be.false;
    expect(as.isAlpha()).to.be.false;
  });

  it('should return false for a null', function() {
    expect(as.isAlpha(null)).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(as.isAlpha(0)).to.be.false;
    expect(as.isAlpha(10)).to.be.false;
    expect(as.isAlpha(-12.05)).to.be.false;
    expect(as.isAlpha(0xFF)).to.be.false;
    expect(as.isAlpha('0')).to.be.false;
    expect(as.isAlpha('10')).to.be.false;
    expect(as.isAlpha('-12.05')).to.be.false;
    expect(as.isAlpha('0xFF')).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(as.isAlpha('')).to.be.false;
  });

});
