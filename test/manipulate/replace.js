import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('replace', function() {

  it('should return the replace result with a string pattern', function() {
    expect(as.replace('duck', 'duck', 'swan')).to.be.equal('swan');
    expect(as.replace('duck', 'duck', '')).to.be.equal('');
    expect(as.replace('duck', 'd', '')).to.be.equal('uck');
    expect(as.replace('duck', 'u', function() {
      return 'a';
    })).to.be.equal('dack');
    expect(as.replace('', '', '')).to.be.equal('');
    expect(as.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(as.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
  });

  it('should return the replace result with a RegExp pattern', function() {
    expect(as.replace('duck', /duck/, 'swan')).to.be.equal('swan');
    expect(as.replace('duck', /duck/, '')).to.be.equal('');
    expect(as.replace('duck', /d/, '')).to.be.equal('uck');
    expect(as.replace('duck', /u/, function() {
      return 'a';
    })).to.be.equal('dack');
    expect(as.replace('hello world', /(hello)\s(world)/, function(match, hello, world) {
      return world + ', ' + hello;
    })).to.be.equal('world, hello');
  });

  it('should return the replace result from a string representation of an object', function() {
    expect(as.replace(['duck'], 'duck', 'swan')).to.be.equal('swan');
    expect(as.replace({
      toString: function() {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).to.be.equal('duck');
  });

  it('should return the replace result from a number', function() {
    expect(as.replace(1500, '0', '1')).to.be.equal('1510');
    expect(as.replace(6475, /\d/g, '*')).to.be.equal('****');
  });

  it('should return the an empty string for an undefined or null', function() {
    expect(as.replace(undefined, /./, '1')).to.be.equal('');
    expect(as.replace(null, /./, '1')).to.be.equal('');
  });

});