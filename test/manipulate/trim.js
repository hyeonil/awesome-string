import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('trim', function() {

  it('should return the trimmed string with default whitespaces', function() {
    expect(as.trim(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trim('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trim('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.');
    expect(as.trim('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trim('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trim('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    expect(as.trim('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
    expect(as.trim(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
  });

  it('should return the trimmed string with custom whitespaces', function() {
    expect(as.trim('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?');
    expect(as.trim('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?');
    expect(as.trim('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    expect(as.trim('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    expect(as.trim('***Do you *feel* in charge?***', '*-')).to.be.equal('Do you *feel* in charge?');
    expect(as.trim('Do you *feel* in charge?', 'Doe?')).to.be.equal(' you *feel* in charg');
    expect(as.trim('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(as.trim('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    expect(as.trim('', '')).to.be.equal('');
  });

  it('should return the trimmed string representation of an object', function() {
    expect(as.trim([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    expect(as.trim({
      toString: function() {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    expect(as.trim(['****You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the trimmed string for numbers', function() {
    expect(as.trim(100, 1)).to.be.equal('00');
    expect(as.trim(6780, 6780)).to.be.equal('');
    expect(as.trim(-115, -1)).to.be.equal('5');
    expect(as.trim(1111, 1)).to.be.equal('');
    expect(as.trim(8998, 8)).to.be.equal('99');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.trim(null)).to.be.equal('');
    expect(as.trim(null, '\n')).to.be.equal('');
    expect(as.trim(null, null)).to.be.equal('');
    expect(as.trim(undefined)).to.be.equal('');
    expect(as.trim(undefined, '*')).to.be.equal('');
    expect(as.trim(undefined, undefined)).to.be.equal('');
  });

});