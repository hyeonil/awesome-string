import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('isLowerCase', function() {

  it('should return true for a lower case string', function() {
    expect(as.isLowerCase('a')).to.be.true;
    expect(as.isLowerCase('helloworld')).to.be.true;
    expect(as.isLowerCase('welcometoearth')).to.be.true;
    expect(as.isLowerCase('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function() {
    expect(as.isLowerCase(['robocop'])).to.be.true;
    expect(as.isLowerCase({
      toString: function() {
        return 'batman';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(as.isLowerCase(true)).to.be.true;
    expect(as.isLowerCase(false)).to.be.true;
  });

  it('should return false for a string containing upper case characters', function() {
    expect(as.isLowerCase('Helloworld')).to.be.false;
    expect(as.isLowerCase('WELCOMETOEARTH')).to.be.false;
  });

  it('should return false for a string containing characters different than lower case', function() {
    expect(as.isLowerCase('hello world!')).to.be.false;
    expect(as.isLowerCase('No one cared who I was until I put on the mask.')).to.be.false;
    expect(as.isLowerCase('\n')).to.be.false;
    expect(as.isLowerCase('\t')).to.be.false;
    expect(as.isLowerCase(' ')).to.be.false;
    expect(as.isLowerCase('')).to.be.false;
    expect(as.isLowerCase(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non lower case string representation of an object', function() {
    expect(as.isLowerCase(['RoboCop'])).to.be.false;
    expect(as.isLowerCase({
      toString: function() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(as.isLowerCase(0)).to.be.false;
    expect(as.isLowerCase(-1500)).to.be.false;
    expect(as.isLowerCase(2017)).to.be.false;
    expect(as.isLowerCase('0')).to.be.false;
    expect(as.isLowerCase('1998')).to.be.false;
  });

  it('should return false for a null', function() {
    expect(as.isLowerCase(null)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(as.isLowerCase(undefined)).to.be.false;
    expect(as.isLowerCase()).to.be.false;
  });

});