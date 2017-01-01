import as from '../awesome-string';
import { expect } from 'chai';

describe('escapeRegExp', function() {

  it('should return the escaped string', function() {
    expect(as.escapeRegExp('-[]/{}()*+?.\\^$|')).to.be.equal(
      '\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|'
    );
    expect(as.escapeRegExp('time')).to.be.equal('time');
    expect(as.escapeRegExp('500-200')).to.be.equal('500\\-200');
    expect(as.escapeRegExp('')).to.be.equal('');
    expect(new RegExp(as.escapeRegExp('[a-z0-9]?')).test('[a-z0-9]?')).to.be.true;
    expect(new RegExp(as.escapeRegExp('.*')).test('future')).to.be.false;
  });

  it('should return the escaped string representation of an object', function() {
    expect(as.escapeRegExp(['-[]object'])).to.be.equal('\\-\\[\\]object');
    expect(as.escapeRegExp({
      toString: function() {
        return '1.15';
      }
    })).to.be.equal('1\\.15');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.escapeRegExp()).to.be.equal('');
    expect(as.escapeRegExp(undefined)).to.be.equal('');
    expect(as.escapeRegExp(null)).to.be.equal('');
  });

});