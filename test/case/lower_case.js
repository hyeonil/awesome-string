import { expect } from 'chai';
import as from '../awesome-string';

describe('lowerCase', function() {

  it('should return the lower case of a string', function() {
    expect(as.lowerCase('Saturn')).to.be.equal('saturn');
    expect(as.lowerCase('EARTH')).to.be.equal('earth');
    expect(as.lowerCase('456')).to.be.equal('456');
    expect(as.lowerCase('')).to.be.equal('');
  });

  it('should return the lower case of a string representation of an object', function() {
    expect(as.lowerCase(['Venus'])).to.be.equal('venus');
    expect(as.lowerCase({
      toString: function() {
        return 'Venus';
      }
    })).to.be.equal('venus');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.lowerCase()).to.be.equal('');
    expect(as.lowerCase(undefined)).to.be.equal('');
    expect(as.lowerCase(null)).to.be.equal('');
  });

});