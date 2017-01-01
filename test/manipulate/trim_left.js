import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('trimLeft', function() {

  it('should return the left trimmed string with default whitespaces', function() {
    expect(as.trimLeft(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trimLeft('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.    ');
    expect(as.trimLeft('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trimLeft('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trimLeft('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    expect(as.trimLeft('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
    expect(as.trimLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
  });

  it('should return the left trimmed string with custom whitespaces', function() {
    expect(as.trimLeft('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?-');
    expect(as.trimLeft('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?---');
    expect(as.trimLeft('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?___');
    expect(as.trimLeft('___Do you *feel* in charge?', '_')).to.be.equal('Do you *feel* in charge?');
    expect(as.trimLeft('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    expect(as.trimLeft('***Do you *feel* in charge?***', '*')).to.be.equal('Do you *feel* in charge?***');
    expect(as.trimLeft('Do you *feel* in charge?', 'Doy')).to.be.equal(' you *feel* in charge?');
    expect(as.trimLeft('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(as.trimLeft('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    expect(as.trimLeft('', '')).to.be.equal('');
  });

  it('should return the left trimmed string representation of an object', function() {
    expect(as.trimLeft([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    expect(as.trimLeft({
      toString: function() {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    expect(as.trimLeft(['****You\'re a big guy!'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the left trimmed string for numbers', function() {
    expect(as.trimLeft(100, 1)).to.be.equal('00');
    expect(as.trimLeft(6780, 6780)).to.be.equal('');
    expect(as.trimLeft(-115, -1)).to.be.equal('5');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.trimLeft(null)).to.be.equal('');
    expect(as.trimLeft(null, '\n')).to.be.equal('');
    expect(as.trimLeft(null, null)).to.be.equal('');
    expect(as.trimLeft(undefined)).to.be.equal('');
    expect(as.trimLeft(undefined, '*')).to.be.equal('');
    expect(as.trimLeft(undefined, undefined)).to.be.equal('');
  });

});