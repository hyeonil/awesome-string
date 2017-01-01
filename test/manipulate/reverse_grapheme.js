import { PRINTABLE_ASCII, REVERSED_PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';
import { expect } from 'chai';

describe('reverseGrapheme', function() {

  it('should reverse a string', function() {
    expect(as.reverseGrapheme('green tree')).to.be.equal('eert neerg');
    expect(as.reverseGrapheme('ma\xF1ana')).to.be.equal('ana\xF1am');
    expect(as.reverseGrapheme('man\u0303ana')).to.be.equal('anan\u0303am');
    expect(as.reverseGrapheme('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal('rabo\u0303\u035C\u035D\u035Eof');
    expect(as.reverseGrapheme('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal('rab\uD834\uDF06\u0303\u035C\u035D\u035Eoof');
    expect(as.reverseGrapheme('o')).to.be.equal('o');
    expect(as.reverseGrapheme('\n\t')).to.be.equal('\t\n');
    expect(as.reverseGrapheme('')).to.be.equal('');
    expect(as.reverseGrapheme(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverseCodePoint a number', function() {
    expect(as.reverseGrapheme(123)).to.be.equal('321');
    expect(as.reverseGrapheme(0)).to.be.equal('0');
    expect(as.reverseGrapheme(-1.5)).to.be.equal('5.1-');
  });

  it('should reverseCodePoint a string representation of an object', function() {
    expect(as.reverseGrapheme(['flower'])).to.be.equal('rewolf');
    expect(as.reverseGrapheme({
      toString: function() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.reverseGrapheme()).to.be.equal('');
    expect(as.reverseGrapheme(null)).to.be.equal('');
    expect(as.reverseGrapheme(undefined)).to.be.equal('');
  });

});