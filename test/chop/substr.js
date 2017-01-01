import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('substr', function() {

  it('should substract a string', function() {
    expect(as.substr('infinite loop', 9)).to.be.equal('loop');
    expect(as.substr('infinite loop', 0)).to.be.equal('infinite loop');
    expect(as.substr('infinite loop')).to.be.equal('infinite loop');
    expect(as.substr('infinite loop', 1)).to.be.equal('nfinite loop');
    expect(as.substr('infinite loop', -4)).to.be.equal('loop');
    expect(as.substr(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should substract a string with a length', function() {
    expect(as.substr('infinite loop', 9, 3)).to.be.equal('loo');
    expect(as.substr('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    expect(as.substr('infinite loop', 1, 1)).to.be.equal('n');
    expect(as.substr('infinite loop', -4, 1)).to.be.equal('l');
  });

  it('should substract a string representation of an object', function() {
    expect(as.substr(['infinite loop'], 10)).to.be.equal('oop');
    expect(as.substr({
      toString: function() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substract a string from a number', function() {
    expect(as.substr(12345, 3)).to.be.equal('45');
    expect(as.substr(987, 1, 1)).to.be.equal('8');
  });
});