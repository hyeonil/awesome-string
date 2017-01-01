import as from '../awesome-string';
import { expect } from 'chai';

describe('codePoints', function() {

  it('should split a string into code point numbers', function() {
    expect(as.codePoints('stellar bomb')).to.eql([0x73, 0x74, 0x65, 0x6C, 0x6C, 0x61, 0x72, 0x20, 0x62, 0x6F, 0x6D, 0x62]);
    expect(as.codePoints('   ')).to.eql([0x20, 0x20, 0x20]);
    expect(as.codePoints('\n\t')).to.eql([0xA, 0x9]);
    expect(as.codePoints('')).to.eql([]);
  });

  it('should split a string with surrogate pairs and diacritical marks characters into code point numbers', function() {
    expect(as.codePoints('man\u0303ana')).to.eql([0x6D, 0x61, 0x6E, 0x303, 0x61, 0x6E, 0x61]);
    expect(as.codePoints('\u00E9\u20DD')).to.eql([0xE9, 0x20DD]);
    expect(as.codePoints('\uD835\uDC00\uD835\uDC01')).to.eql([0x1D400, 0x1D401]);
    expect(as.codePoints('cafe\u0301')).to.eql([0x63, 0x61, 0x66, 0x65, 0x301]);
    expect(as.codePoints('foo\u0303\u035C\u035D\u035Ebar')).to.eql([0x66, 0x6F, 0x6F, 0x303, 0x35C, 0x35D, 0x35E, 0x62,
      0x61, 0x72]);
    expect(as.codePoints('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.eql([0x66, 0x6F, 0x6F, 0x1D306, 0x303, 0x35C,
      0x35D, 0x35E, 0x62, 0x61, 0x72]);
  });

  it('should split a number into code point numbers', function() {
    expect(as.codePoints(0)).to.eql([0x30]);
    expect(as.codePoints(1560)).to.eql([0x31, 0x35, 0x36, 0x30]);
    expect(as.codePoints(-1.6)).to.eql([0x2D, 0x31, 0x2E, 0x36]);
  });

  it('should split the string representation of an object into code point numbers', function() {
    expect(as.codePoints(['star'])).to.eql([0x73, 0x74, 0x61, 0x72]);
    expect(as.codePoints({
      toString: function() {
        return 'Capa';
      }
    })).to.eql([0x43, 0x61, 0x70, 0x61]);
  });

  it('should return an empty array for null and undefined', function() {
    expect(as.codePoints()).to.eql([]);
    expect(as.codePoints(undefined)).to.eql([]);
    expect(as.codePoints(null)).to.eql([]);
  });

});