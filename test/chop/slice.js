import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('slice', function() {

  it('should slice a string', function() {
    expect(as.slice('infinite loop', 9)).to.be.equal('loop');
    expect(as.slice('infinite loop', 0)).to.be.equal('infinite loop');
    expect(as.slice('infinite loop')).to.be.equal('infinite loop');
    expect(as.slice('infinite loop', 1)).to.be.equal('nfinite loop');
    expect(as.slice(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should slice a string with an end position', function() {
    expect(as.slice('infinite loop', 9, 12)).to.be.equal('loo');
    expect(as.slice('infinite loop', 9, -1)).to.be.equal('loo');
    expect(as.slice('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    expect(as.slice('infinite loop', 1, 2)).to.be.equal('n');
    expect(as.slice('infinite loop', -4, -1)).to.be.equal('loo');
  });

  it('should slice a string representation of an object', function() {
    expect(as.slice(['infinite loop'], 10)).to.be.equal('oop');
    expect(as.slice({
      toString: function() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should slice a string from a number', function() {
    expect(as.slice(12345, 3)).to.be.equal('45');
    expect(as.slice(987, 1, 2)).to.be.equal('8');
  });
});