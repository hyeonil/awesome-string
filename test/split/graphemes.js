import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('graphemes', function() {

  it('should split a string into characters', function() {
    expect(as.graphemes('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    expect(as.graphemes('   ')).to.eql([' ', ' ', ' ']);
    expect(as.graphemes('\n\t')).to.eql(['\n', '\t']);
    expect(as.graphemes('')).to.eql([]);
    expect(as.graphemes(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a string into surrogate pairs and diacritical marks characters', function() {
    expect(as.graphemes('man\u0303ana')).to.eql(['m', 'a', 'n\u0303', 'a', 'n', 'a']);
    expect(as.graphemes('\u00E9\u20DD')).to.eql(['\u00E9\u20DD']);
    expect(as.graphemes('\uD835\uDC00\uD835\uDC01')).to.eql(['\uD835\uDC00', '\uD835\uDC01']);
    expect(as.graphemes('cafe\u0301')).to.eql(['c', 'a', 'f', 'e\u0301']);
    expect(as.graphemes('foo\u0303\u035C\u035D\u035Ebar')).to.eql(['f', 'o', 'o\u0303\u035C\u035D\u035E', 'b', 'a', 'r']);
    expect(as.graphemes('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.eql(['f', 'o', 'o', '\uD834\uDF06\u0303\u035C\u035D\u035E', 'b', 'a', 'r']);
  });

  it('should split a number into characters', function() {
    expect(as.graphemes(0)).to.eql(['0']);
    expect(as.graphemes(1560)).to.eql(['1', '5', '6', '0']);
    expect(as.graphemes(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(as.graphemes(['star'])).to.eql(['s', 't', 'a', 'r']);
    expect(as.graphemes({
      toString: function() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function() {
    expect(as.graphemes()).to.eql([]);
    expect(as.graphemes(undefined)).to.eql([]);
    expect(as.graphemes(null)).to.eql([]);
  });

});