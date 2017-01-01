import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('chars', function() {

  it('should split a string into characters', function() {
    expect(as.chars('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    expect(as.chars('   ')).to.eql([' ', ' ', ' ']);
    expect(as.chars('\n\t')).to.eql(['\n', '\t']);
    expect(as.chars('')).to.eql([]);
    expect(as.chars(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a number into characters', function() {
    expect(as.chars(0)).to.eql(['0']);
    expect(as.chars(1560)).to.eql(['1', '5', '6', '0']);
    expect(as.chars(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(as.chars(['star'])).to.eql(['s', 't', 'a', 'r']);
    expect(as.chars({
      toString: function() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });


  it('should return an empty array of characters for null and undefined', function() {
    expect(as.chars()).to.eql([]);
    expect(as.chars(undefined)).to.eql([]);
    expect(as.chars(null)).to.eql([]);
  });

});