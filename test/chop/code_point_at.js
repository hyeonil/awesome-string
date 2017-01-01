import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('codePointAt', function() {

  it('should return the code pount number by position', function() {
    expect(as.codePointAt('Good day', 0)).to.be.equal(0x0047);
    expect(as.codePointAt('Good day', 1)).to.be.equal(0x006F);
    expect(as.codePointAt('Good day', 7)).to.be.equal(0x0079);
    expect(as.codePointAt(PRINTABLE_ASCII, 0)).to.be.equal(0x0020);
    expect(as.codePointAt('man\u0303ana', 2)).to.equal(0x006E);
    expect(as.codePointAt('\u00E9\u20DD', 0)).to.equal(0x00E9);
    expect(as.codePointAt('\uD835\uDC00\uD835\uDC01', 0)).to.equal(0x1D400);
    expect(as.codePointAt('\uD835\uDC00\uD835\uDC01', 1)).to.equal(0xDC00);
    expect(as.codePointAt('\uD835\uDC00\uD835\uDC01', 2)).to.equal(0x1D401);
    expect(as.codePointAt('\uD835\uDC00\uD835\uDC01', 3)).to.equal(0xDC01);
    expect(as.codePointAt('cafe\u0301', 3)).to.equal(0x0065);
    expect(as.codePointAt('cafe\u0301', 4)).to.equal(0x0301);
    expect(as.codePointAt('foo\u0303\u035C\u035D\u035Ebar', 2)).to.equal(0x006F);
    expect(as.codePointAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 3))
      .to.equal(0x1D306);
    expect(as.codePointAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 12))
      .to.equal(0x1D306);
    expect(as.codePointAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 13))
      .to.equal(0xDF06);
    expect(as.codePointAt('Good day')).to.be.equal(0x0047);
    expect(as.codePointAt('Good day', undefined)).to.be.equal(0x0047);
    expect(as.codePointAt('Good day', null)).to.be.equal(0x0047);
    expect(as.codePointAt('Good day', NaN)).to.be.equal(0x0047);
    expect(as.codePointAt(String.fromCharCode(0xD835) + '0', 0)).to.be.equal(0xD835);
  });

  it('should return undefined for out of bounds position', function() {
    expect(as.codePointAt('Good day', -1)).to.be.equal(undefined);
    expect(as.codePointAt('Good day', 100)).to.be.equal(undefined);
    expect(as.codePointAt('cafe\u0301', 5)).to.be.equal(undefined);
    expect(as.codePointAt('\uD835\uDC00\uD835\uDC01', 4)).to.equal(undefined);
    expect(as.codePointAt('', 0)).to.be.equal(undefined);
  });

  it('should return the code point number by position in a string representation of an object', function() {
    expect(as.codePointAt(['Good evening'], 5)).to.be.equal(0x0065);
    expect(as.codePointAt({
      toString: function() {
        return 'Morning';
      }
    }, 1)).to.be.equal(0x006F);
  });

  it('should return undefined for null or undefined', function() {
    expect(as.codePointAt()).to.be.equal(undefined);
    expect(as.codePointAt(undefined)).to.be.equal(undefined);
    expect(as.codePointAt(null)).to.be.equal(undefined);
    expect(as.codePointAt(null, null)).to.be.equal(undefined);
    expect(as.codePointAt(undefined, undefined)).to.be.equal(undefined);
  });

});