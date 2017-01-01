import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('padLeft', function() {

  it('should left pad a string', function() {
    expect(as.padLeft('FF', 4, '0')).to.be.equal('00FF');
    expect(as.padLeft('00FF', 4, '0')).to.be.equal('00FF');
    expect(as.padLeft('ab', 10, '012')).to.be.equal('01201201ab');
    expect(as.padLeft('0', 5, '0')).to.be.equal('00000');
    expect(as.padLeft('', 10, '01')).to.be.equal('0101010101');
    expect(as.padLeft('Hello World')).to.be.equal('Hello World');
    expect(as.padLeft('Hello World', 20, '')).to.be.equal('Hello World');
    expect(as.padLeft('Welcome', 10)).to.be.equal('   Welcome');
    expect(as.padLeft('Alien', 10, '-=')).to.be.equal('-=-=-Alien');
    expect(as.padLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(as.padLeft(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('---' + PRINTABLE_ASCII);
    expect(as.padLeft('')).to.be.equal('');
    expect(as.padLeft('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(as.padLeft('Hello World', 0, ' ')).to.be.equal('Hello World');
    expect(as.padLeft('Hello World', 5, ' ')).to.be.equal('Hello World');
    expect(as.padLeft('0', 0, ' ')).to.be.equal('0');
    expect(as.padLeft('123', -1, ' ')).to.be.equal('123');
  });

  it('should left pad a string representation of an object', function() {
    expect(as.padLeft(['Welcome'], 9)).to.be.equal('  Welcome');
    expect(as.padLeft({
      toString: function() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('-----great');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.padLeft()).to.be.equal('');
    expect(as.padLeft(undefined)).to.be.equal('');
    expect(as.padLeft(null)).to.be.equal('');
  });

});