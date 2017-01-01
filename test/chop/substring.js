import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('substring', function() {

  it('should substring a string', function() {
    expect(as.substring('infinite loop', 9)).to.be.equal('loop');
    expect(as.substring('infinite loop', 0)).to.be.equal('infinite loop');
    expect(as.substring('infinite loop')).to.be.equal('infinite loop');
    expect(as.substring('infinite loop', 1)).to.be.equal('nfinite loop');
    expect(as.substring(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should substring a string with an end position', function() {
    expect(as.substring('infinite loop', 9, 12)).to.be.equal('loo');
    expect(as.substring('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    expect(as.substring('infinite loop', 1, 2)).to.be.equal('n');
  });

  it('should substring a string representation of an object', function() {
    expect(as.substring(['infinite loop'], 10)).to.be.equal('oop');
    expect(as.substring({
      toString: function() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substring a string from a number', function() {
    expect(as.substring(12345, 3)).to.be.equal('45');
    expect(as.substring(987, 1, 2)).to.be.equal('8');
  });
});