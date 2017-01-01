import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('pad', function() {

  it('should pad a string', function() {
    expect(as.pad('FF', 4, '0')).to.be.equal('0FF0');
    expect(as.pad('00FF', 4, '0')).to.be.equal('00FF');
    expect(as.pad('ab', 10, '012')).to.be.equal('0120ab0120');
    expect(as.pad('0', 5, '0')).to.be.equal('00000');
    expect(as.pad('', 10, '01')).to.be.equal('0101001010');
    expect(as.pad('Hello World')).to.be.equal('Hello World');
    expect(as.pad('Hello World', 20, '')).to.be.equal('Hello World');
    expect(as.pad('Welcome', 10)).to.be.equal(' Welcome  ');
    expect(as.pad('Alien', 10, '-=')).to.be.equal('-=Alien-=-');
    expect(as.pad(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(as.pad(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('-' + PRINTABLE_ASCII + '--');
    expect(as.pad('')).to.be.equal('');
    expect(as.pad('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(as.pad('Hello World', 0, ' ')).to.be.equal('Hello World');
    expect(as.pad('Hello World', 5, ' ')).to.be.equal('Hello World');
    expect(as.pad('0', 0, ' ')).to.be.equal('0');
    expect(as.pad('123', -1, ' ')).to.be.equal('123');
  });

  it('should pad a string representation of an object', function() {
    expect(as.pad(['Welcome'], 9)).to.be.equal(' Welcome ');
    expect(as.pad({
      toString: function() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('--great---');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.pad()).to.be.equal('');
    expect(as.pad(undefined)).to.be.equal('');
    expect(as.pad(null)).to.be.equal('');
  });

});