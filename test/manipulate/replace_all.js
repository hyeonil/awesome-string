import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('replaceAll', function() {

  it('should return the replace result with a string pattern', function() {
    expect(as.replaceAll('duck', 'duck', 'swan')).to.be.equal('swan');
    expect(as.replaceAll('duck duck', 'duck', 'swan')).to.be.equal('swan swan');
    expect(as.replaceAll('duck', 'duck', '')).to.be.equal('');
    expect(as.replaceAll('dduucckk', 'd', 'dd')).to.be.equal('dddduucckk');
    expect(as.replaceAll('duck', 'd', '')).to.be.equal('uck');
    expect(as.replaceAll('duck duck duc', 'duck', function() {
      return 'swan';
    })).to.be.equal('swan swan duc');
    expect(as.replaceAll('duck', 'u', function() {
      return 'a';
    })).to.be.equal('dack');
    expect(as.replaceAll('[a-b] [a-c][a-b]', '[a-b]', '[ab]')).to.be.equal('[ab] [a-c][ab]');
    expect(as.replaceAll('*.*.', '*.', '*')).to.be.equal('**');
    expect(as.replaceAll('\u0061 \u0061 b \u0061', '\u0061', '\u0062')).to.be.equal('b b b b');
    expect(as.replaceAll('', '', '')).to.be.equal('');
    expect(as.replaceAll('duck', '', '')).to.be.equal('duck');
    expect(as.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(as.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
  });

  it('should return the replace result with a RegExp pattern', function() {
    expect(as.replaceAll('duck duck', /duck/, 'swan')).to.be.equal('swan swan');
    expect(as.replaceAll('duck DUCK', /duck/, 'swan')).to.be.equal('swan DUCK');
    expect(as.replaceAll('duck DUCK', /DUCK/i, 'swan')).to.be.equal('swan swan');
    expect(as.replaceAll('duck', /duck/, '')).to.be.equal('');
    expect(as.replaceAll('duck', /d/, '')).to.be.equal('uck');
    expect(as.replaceAll('duck duck', /u/, function() {
      return 'a';
    })).to.be.equal('dack dack');
    expect(as.replaceAll('hello world', /(hello)\s(world)/, function(match, hello, world) {
      return world + ', ' + hello;
    })).to.be.equal('world, hello');
  });

  it('should return the replace result from a string representation of an object', function() {
    expect(as.replaceAll(['duck'], 'duck', 'swan')).to.be.equal('swan');
    expect(as.replaceAll({
      toString: function() {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).to.be.equal('duck');
  });

  it('should return the replace result from a number', function() {
    expect(as.replaceAll(1500, '0', '1')).to.be.equal('1511');
    expect(as.replaceAll(6475, /\d/g, '*')).to.be.equal('****');
    expect(as.replaceAll(6475, /\d/, '*')).to.be.equal('****');
  });

  it('should return the original string on failed match', function() {
    expect(as.replaceAll('duck', 'dack', 'swan')).to.be.equal('duck');
    expect(as.replaceAll('duck', /dack/, '')).to.be.equal('duck');
  });

  it('should return the an empty string for an undefined or null', function() {
    expect(as.replaceAll(undefined, /./, '1')).to.be.equal('');
    expect(as.replaceAll(null, /./, '1')).to.be.equal('');
  });

});