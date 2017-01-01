import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('isUpperCase', function() {

  it('should return true for an upper case string', function() {
    expect(as.isUpperCase('A')).to.be.true;
    expect(as.isUpperCase('HELLOWORLD')).to.be.true;
    expect(as.isUpperCase('WELCOMETOEARTH')).to.be.true;
    expect(as.isUpperCase('ÁÉÈÊËÍÎÏÓÔÚÛÝÀÒÜÇÄÖÂÙŸÃÕÑ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function() {
    expect(as.isUpperCase(['ROBOCOP'])).to.be.true;
    expect(as.isUpperCase({
      toString: function() {
        return 'BATMAN';
      }
    })).to.be.true;
  });

  it('should return false for a string containing lower case characters', function() {
    expect(as.isUpperCase('Helloworld')).to.be.false;
    expect(as.isUpperCase('WeLCOMETOEARTH')).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(as.isUpperCase(true)).to.be.false;
    expect(as.isUpperCase(false)).to.be.false;
  });

  it('should return false for a string containing characters different than upper case', function() {
    expect(as.isUpperCase('hello world!')).to.be.false;
    expect(as.isUpperCase('No one cared who I was until I put on the mask.')).to.be.false;
    expect(as.isUpperCase('\n')).to.be.false;
    expect(as.isUpperCase('\t')).to.be.false;
    expect(as.isUpperCase(' ')).to.be.false;
    expect(as.isUpperCase('')).to.be.false;
    expect(as.isUpperCase(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non upper case string representation of an object', function() {
    expect(as.isUpperCase(['RoboCop'])).to.be.false;
    expect(as.isUpperCase({
      toString: function() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(as.isUpperCase(0)).to.be.false;
    expect(as.isUpperCase(-1500)).to.be.false;
    expect(as.isUpperCase(2017)).to.be.false;
    expect(as.isUpperCase('0')).to.be.false;
    expect(as.isUpperCase('1998')).to.be.false;
  });

  it('should return false for a null', function() {
    expect(as.isUpperCase(null)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(as.isUpperCase(undefined)).to.be.false;
    expect(as.isUpperCase()).to.be.false;
  });

});