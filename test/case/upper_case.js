import { expect } from 'chai';
import as from '../awesome-string';

describe('upperCase', function() {

  it('should return the upper case of a string', function() {
    expect(as.upperCase('Saturn')).to.be.equal('SATURN');
    expect(as.upperCase('Earth')).to.be.equal('EARTH');
    expect(as.upperCase('456')).to.be.equal('456');
    expect(as.upperCase('')).to.be.equal('');
  });

  it('should return the upper case of a string representation of an object', function() {
    expect(as.upperCase(['Venus'])).to.be.equal('VENUS');
    expect(as.upperCase({
      toString: function() {
        return 'Venus';
      }
    })).to.be.equal('VENUS');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.upperCase()).to.be.equal('');
    expect(as.upperCase(undefined)).to.be.equal('');
    expect(as.upperCase(null)).to.be.equal('');
  });

});