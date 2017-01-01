import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('trimRight', function() {

  it('should return the right trimmed string with default whitespaces', function() {
    expect(as.trimRight('Yes. The fire rises. ')).to.be.equal('Yes. The fire rises.');
    expect(as.trimRight('Yes. The fire rises.   ')).to.be.equal('Yes. The fire rises.');
    expect(as.trimRight('   Yes. The fire rises.    ')).to.be.equal('   Yes. The fire rises.');
    expect(as.trimRight('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(as.trimRight('Yes. The fire rises.\n\f\t ')).to.be.equal('Yes. The fire rises.');
    expect(as.trimRight('Yes. The fire rises.\n\f\t ', null)).to.be.equal('Yes. The fire rises.');
    expect(as.trimRight('Yes. The fire rises.\n\f\t ', undefined)).to.be.equal('Yes. The fire rises.');
    expect(as.trimRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should return the right trimmed string with custom whitespaces', function() {
    expect(as.trimRight('-Do you *feel* in charge?-', '-')).to.be.equal('-Do you *feel* in charge?');
    expect(as.trimRight('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('---Do-you-*feel*-in-charge?');
    expect(as.trimRight('___Do you *feel* in charge?', '_')).to.be.equal('___Do you *feel* in charge?');
    expect(as.trimRight('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    expect(as.trimRight('Do you *feel* in charge?<-', '<-')).to.be.equal('Do you *feel* in charge?');
    expect(as.trimRight('***Do you *feel* in charge?***', '**')).to.be.equal('***Do you *feel* in charge?');
    expect(as.trimRight('Do you *feel* in charge?', 'charge?')).to.be.equal('Do you *feel* in ');
    expect(as.trimRight('Do you *feel* in charge?\n\n', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(as.trimRight('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    expect(as.trimRight('', '')).to.be.equal('');
  });

  it('should return the right trimmed string representation of an object', function() {
    expect(as.trimRight(['Yes. The fire rises. '])).to.be.equal('Yes. The fire rises.');
    expect(as.trimRight({
      toString: function() {
        return 'Yes. The fire rises.\n\n';
      }
    })).to.be.equal('Yes. The fire rises.');
    expect(as.trimRight(['You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the right trimmed string for numbers', function() {
    expect(as.trimRight(100, 0)).to.be.equal('1');
    expect(as.trimRight(6780, 6780)).to.be.equal('');
    expect(as.trimRight(-115, 15)).to.be.equal('-');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.trimRight(null)).to.be.equal('');
    expect(as.trimRight(null, '\n')).to.be.equal('');
    expect(as.trimRight(null, null)).to.be.equal('');
    expect(as.trimRight(undefined)).to.be.equal('');
    expect(as.trimRight(undefined, '*')).to.be.equal('');
    expect(as.trimRight(undefined, undefined)).to.be.equal('');
  });

});