import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('repeat', function() {

  it('should repeat a string', function() {
    expect(as.repeat('paradise', 2)).to.be.equal('paradiseparadise');
    expect(as.repeat('w', 3)).to.be.equal('www');
    expect(as.repeat('the world is yours', 1)).to.be.equal('the world is yours');
    expect(as.repeat('', 10)).to.be.equal('');
    expect(as.repeat(PRINTABLE_ASCII, 2)).to.be.equal(PRINTABLE_ASCII + PRINTABLE_ASCII);
  });

  it('should return an empty string for 0 repeat times', function() {
    expect(as.repeat('the world is yours', 0)).to.be.equal('');
    expect(as.repeat('', 0)).to.be.equal('');
  });

  it('should return the same string when the number of times is null or undefined', function() {
    expect(as.repeat('the world is yours')).to.be.equal('the world is yours');
    expect(as.repeat('the world is yours', null)).to.be.equal('the world is yours');
    expect(as.repeat('the world is yours', undefined)).to.be.equal('the world is yours');
  });

  it('should repeat a number', function() {
    expect(as.repeat(123, 2)).to.be.equal('123123');
    expect(as.repeat(0, 5)).to.be.equal('00000');
    expect(as.repeat(-1.5, 2)).to.be.equal('-1.5-1.5');
  });

  it('should repeat a string representation of an object', function() {
    expect(as.repeat(['paradise'], 2)).to.be.equal('paradiseparadise');
    expect(as.repeat({
      toString: function() {
        return 'Tony';
      }
    }, 2)).to.be.equal('TonyTony');
  });

  it('should return an empty string for null or undefined string to be repeated', function() {
    expect(as.repeat()).to.be.equal('');
    expect(as.repeat(null)).to.be.equal('');
    expect(as.repeat(undefined)).to.be.equal('');
    expect(as.repeat(undefined, 10)).to.be.equal('');
  });

});