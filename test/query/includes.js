import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('includes', function() {

  it('should return true for an included string', function() {
    expect(as.includes('mobile infantry', 'mobile')).to.be.true;
    expect(as.includes('mobile infantry', 'infantry')).to.be.true;
    expect(as.includes('mobile infantry', 'mobile infantry')).to.be.true;
    expect(as.includes('mobile infantry', ' ')).to.be.true;
    expect(as.includes('mobile infantry', '')).to.be.true;
    expect(as.includes('', '')).to.be.true;
    expect(as.includes(undefined, '')).to.be.true;
    expect(as.includes('\nwelcome', '\n')).to.be.true;
    expect(as.includes(PRINTABLE_ASCII, '+')).to.be.true;
  });

  it('should return true for an included string and position', function() {
    expect(as.includes('mobile infantry', 'mobile', 0)).to.be.true;
    expect(as.includes('mobile infantry', 'infantry', 7)).to.be.true;
    expect(as.includes('mobile infantry', 'mobile infantry', 0)).to.be.true;
    expect(as.includes('mobile infantry', ' ', 6)).to.be.true;
    expect(as.includes('mobile infantry', '', 0)).to.be.true;
    expect(as.includes('mobile infantry', '', 6)).to.be.true;
    expect(as.includes('', '', 0)).to.be.true;
    expect(as.includes('', '', 6)).to.be.true;
  });

  it('should return true for an included string representation of an object', function() {
    expect(as.includes(['mobile infantry'], 'mobile')).to.be.true;
    expect(as.includes({
      toString: function() {
        return 'mobile infantry';
      }
    }, 'infantry')).to.be.true;
    expect(as.includes(['mobile infantry'], ['mobile infantry'])).to.be.true;
  });

  it('should return true for an included number', function() {
    expect(as.includes(155, 55));
    expect(as.includes('1078', 78));
    expect(as.includes(0, 0));
    expect(as.includes(80, ''));
  });

  it('should return false for a not included string', function() {
    expect(as.includes('mobile infantry', 'be mobile')).to.be.false;
    expect(as.includes('mobile infantry', 'infantry ')).to.be.false;
    expect(as.includes('mobile infantry', ' mobile infantry ')).to.be.false;
    expect(as.includes('mobile infantry', '!')).to.be.false;
    expect(as.includes('', 'mobile')).to.be.false;
    expect(as.includes('\nwelcome', '\t')).to.be.false;
  });

  it('should return false for a not included string and position', function() {
    expect(as.includes('mobile infantry', 'mobile', 1)).to.be.false;
    expect(as.includes('mobile infantry', 'infantry', 8)).to.be.false;
    expect(as.includes('mobile infantry', 'mobile infantry', 2)).to.be.false;
    expect(as.includes('mobile infantry', ' ', 7)).to.be.false;
  });

  it('should return false for a not included string representation of an object', function() {
    expect(as.includes(['mobile infantry'], 'mobile number')).to.be.false;
    expect(as.includes({
      toString: function() {
        return 'mobile infantry';
      }
    }, 'motorized infantry')).to.be.false;
    expect(as.includes(['mobile infantry'], ['mobile infantry'], 1)).to.be.false;
  });

  it('should return false for a undefined or null search string', function() {
    expect(as.includes('mobile infantry', undefined)).to.be.false;
    expect(as.includes('mobile infantry', null)).to.be.false;
  });

});