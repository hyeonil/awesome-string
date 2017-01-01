import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('indexOf', function() {

  it('should return the index of a searched string', function() {
    expect(as.indexOf('we have a mission', 'mission')).to.be.equal(10);
    expect(as.indexOf('we have a mission', 'a')).to.be.equal(4);
    expect(as.indexOf('we have a mission', 'we')).to.be.equal(0);
    expect(as.indexOf('we have a mission', '')).to.be.equal(0);
    expect(as.indexOf('', '')).to.be.equal(0);
    expect(as.indexOf(undefined, '')).to.be.equal(0);
    expect(as.indexOf(null, '')).to.be.equal(0);
    expect(as.indexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a searched string and start index', function() {
    expect(as.indexOf('we have a mission', 'a', 6)).to.be.equal(8);
    expect(as.indexOf('we have a mission', 'we', 0)).to.be.equal(0);
    expect(as.indexOf('we have a mission', 'we', NaN)).to.be.equal(0);
    expect(as.indexOf('we have a mission', '', 0)).to.be.equal(0);
    expect(as.indexOf(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function() {
    expect(as.indexOf(['we have a mission'], 'a')).to.be.equal(4);
    expect(as.indexOf({
      toString: function() {
        return 'we have a mission';
      }
    }, 'we')).to.be.equal(0);
  });

  it('should return -1 for an invalid ending string and position', function() {
    expect(as.indexOf('we have a mission', 'me')).to.be.equal(-1);
    expect(as.indexOf('we have a mission', '12')).to.be.equal(-1);
    expect(as.indexOf('we have a mission', 'we', 3)).to.be.equal(-1);
    expect(as.indexOf('we have a mission', 'mission', 100)).to.be.equal(-1);
    expect(as.indexOf('we have a mission', 'mission', Infinity)).to.be.equal(-1);
    expect(as.indexOf('', 'me')).to.be.equal(-1);
  });

  it('should return -1 for undefined and null parameters', function() {
    expect(as.indexOf('we have a mission')).to.be.equal(-1);
    expect(as.indexOf('we have a mission', undefined)).to.be.equal(-1);
    expect(as.indexOf('we have a mission', null)).to.be.equal(-1);
  });

});