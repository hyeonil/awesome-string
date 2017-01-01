import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('padRight', function() {

  it('should right pad a string', function() {
    expect(as.padRight('FF', 4, '0')).to.be.equal('FF00');
    expect(as.padRight('00FF', 4, '0')).to.be.equal('00FF');
    expect(as.padRight('ab', 10, '012')).to.be.equal('ab01201201');
    expect(as.padRight('0', 5, '0')).to.be.equal('00000');
    expect(as.padRight('', 10, '01')).to.be.equal('0101010101');
    expect(as.padRight('Hello World')).to.be.equal('Hello World');
    expect(as.padRight('Hello World', 20, '')).to.be.equal('Hello World');
    expect(as.padRight('Welcome', 10)).to.be.equal('Welcome   ');
    expect(as.padRight('123', 6, '_-')).to.be.equal('123_-_');
    expect(as.padRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(as.padRight(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal(PRINTABLE_ASCII + '---');
    expect(as.padRight('')).to.be.equal('');
    expect(as.padRight('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(as.padRight('Hello World', 0, ' ')).to.be.equal('Hello World');
    expect(as.padRight('Hello World', 5, ' ')).to.be.equal('Hello World');
    expect(as.padRight('0', 0, ' ')).to.be.equal('0');
    expect(as.padRight('123', -1, ' ')).to.be.equal('123');
  });

  it('should right pad a string representation of an object', function() {
    expect(as.padRight(['Welcome'], 9)).to.be.equal('Welcome  ');
    expect(as.padRight({
      toString: function() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('great-----');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.padRight()).to.be.equal('');
    expect(as.padRight(undefined)).to.be.equal('');
    expect(as.padRight(null)).to.be.equal('');
  });

});