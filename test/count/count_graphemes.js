import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('countGraphemes', function() {

  it('should return the number of characters in a string', function() {
    expect(as.countGraphemes('rain')).to.be.equal(4);
    expect(as.countGraphemes('')).to.be.equal(0);
    expect(as.countGraphemes('rainbow')).to.be.equal(7);
    expect(as.countGraphemes('\u00E9\u20DD')).to.be.equal(1);
    expect(as.countGraphemes('\uD835\uDC00\uD835\uDC01')).to.be.equal(2);
    expect(as.countGraphemes('man\u0303ana')).to.be.equal(6);
    expect(as.countGraphemes('cafe\u0301')).to.be.equal(4);
    expect(as.countGraphemes('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal(6);
    expect(as.countGraphemes('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal(7);
    expect(as.countGraphemes(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(as.countGraphemes(123)).to.be.equal(3);
    expect(as.countGraphemes(0)).to.be.equal(1);
    expect(as.countGraphemes(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(as.countGraphemes(['droplet'])).to.be.equal(7);
    expect(as.countGraphemes({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(as.countGraphemes()).to.be.equal(0);
    expect(as.countGraphemes(null)).to.be.equal(0);
    expect(as.countGraphemes(undefined)).to.be.equal(0);
  });

});