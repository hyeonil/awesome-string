import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('capitalize', function() {

  it('should capitalize the first character in a string', function() {
    expect(as.capitalize('APPLE')).to.be.equal('APPLE');
    expect(as.capitalize('apple')).to.be.equal('Apple');
    expect(as.capitalize('macBook')).to.be.equal('MacBook');
    expect(as.capitalize('f')).to.be.equal('F');
    expect(as.capitalize('')).to.be.equal('');
    expect(as.capitalize('*apple')).to.be.equal('*apple');
    expect(as.capitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should capitalize the first character in a string and keep the rest unmodified', function() {
    expect(as.capitalize('apple', true)).to.be.equal('Apple');
    expect(as.capitalize('APPLE', true)).to.be.equal('Apple');
    expect(as.capitalize('яблоко', true)).to.be.equal('Яблоко');
    expect(as.capitalize('f', true)).to.be.equal('F');
    expect(as.capitalize('', true)).to.be.equal('');
    expect(as.capitalize('100', true)).to.be.equal('100');
    expect(as.capitalize('  ', true)).to.be.equal('  ');
  });

  it('should capitalize the first character in a string representation of an object', function() {
    expect(as.capitalize(['grape'])).to.be.equal('Grape');
    expect(as.capitalize({
      toString: function() {
        return 'oRaNgE';
      }
    }, false)).to.be.equal('ORaNgE');
  });

  it('should not modify numbers', function() {
    expect(as.capitalize(100)).to.be.equal('100');
    expect(as.capitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.capitalize()).to.be.equal('');
    expect(as.capitalize(undefined)).to.be.equal('');
    expect(as.capitalize(null)).to.be.equal('');
    expect(as.capitalize(undefined, true)).to.be.equal('');
    expect(as.capitalize(undefined, false)).to.be.equal('');
  });

});