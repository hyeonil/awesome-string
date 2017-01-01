import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('decapitalize', function() {

  it('should decapitalize the first character in a string', function() {
    expect(as.decapitalize('Light')).to.be.equal('light');
    expect(as.decapitalize('light')).to.be.equal('light');
    expect(as.decapitalize('Sun')).to.be.equal('sun');
    expect(as.decapitalize('f')).to.be.equal('f');
    expect(as.decapitalize('')).to.be.equal('');
    expect(as.decapitalize('*light')).to.be.equal('*light');
    expect(as.decapitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should decapitalize the first character in a string representation of an object', function() {
    expect(as.decapitalize(['Fruit'])).to.be.equal('fruit');
    expect(as.decapitalize({
      toString: function() {
        return 'CaRrOt';
      }
    }, false)).to.be.equal('caRrOt');
  });

  it('should not modify numbers', function() {
    expect(as.decapitalize(100)).to.be.equal('100');
    expect(as.decapitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.decapitalize()).to.be.equal('');
    expect(as.decapitalize(undefined)).to.be.equal('');
    expect(as.decapitalize(null)).to.be.equal('');
  });

});