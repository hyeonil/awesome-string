import { PRINTABLE_ASCII, REVERSED_PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';
import { expect } from 'chai';

describe('reverse', function() {

  it('should reverse a string', function() {
    expect(as.reverse('green tree')).to.be.equal('eert neerg');
    expect(as.reverse('o')).to.be.equal('o');
    expect(as.reverse('\n\t')).to.be.equal('\t\n');
    expect(as.reverse('')).to.be.equal('');
    expect(as.reverse(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverse a number', function() {
    expect(as.reverse(123)).to.be.equal('321');
    expect(as.reverse(0)).to.be.equal('0');
    expect(as.reverse(-1.5)).to.be.equal('5.1-');
  });

  it('should reverse a string representation of an object', function() {
    expect(as.reverse(['flower'])).to.be.equal('rewolf');
    expect(as.reverse({
      toString: function() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.reverse()).to.be.equal('');
    expect(as.reverse(null)).to.be.equal('');
    expect(as.reverse(undefined)).to.be.equal('');
  });

});