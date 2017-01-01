import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('prune', function() {

  it('should prune a string', function() {
    expect(as.prune('Once upon a time there lived in a certain village a little country girl', 7)).to.be.equal('Once...');
    expect(as.prune('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
    expect(as.prune('Little Red Riding Hood', 6, '...')).to.be.equal('...');
    expect(as.prune('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
    expect(as.prune('Little Red Riding Hood', 11, '...')).to.be.equal('Little...');
    expect(as.prune('Little Red Riding Hood', 20, '...')).to.be.equal('Little Red Riding...');
    expect(as.prune('Little Red Riding Hood', 22, '...')).to.be.equal('Little Red Riding Hood');
    expect(as.prune('Little Red Riding Hood', 1, '...')).to.be.equal('...');
    expect(as.prune('Little Red Riding Hood', 5, '...')).to.be.equal('...');
    expect(as.prune('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
    expect(as.prune(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    expect(as.prune(PRINTABLE_ASCII, 0)).to.be.equal('...');
  });

  it('should prune a string with extra ASCII characters', function() {
    expect(as.prune('Привет, как дела', 10, '...')).to.be.equal('Привет...');
    expect(as.prune('La variété la plus fréquente est la blanche', 12, '..')).to.be.equal('La variété..');
  });

  it('should not prune a string if length parameter is greater or equal than string length', function() {
    expect(as.prune('Once upon', 20)).to.be.equal('Once upon');
    expect(as.prune('Once', 4, ' (read more)')).to.be.equal('Once');
    expect(as.prune('', 0, '....')).to.be.equal('');
  });

  it('should prune a string representation of an object', function() {
    expect(as.prune(['Welcome'], 4)).to.be.equal('...');
    expect(as.prune({
      toString: function() {
        return 'Have a nice day';
      }
    }, 6, '..')).to.be.equal('Have..');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.prune()).to.be.equal('');
    expect(as.prune(undefined)).to.be.equal('');
    expect(as.prune(null)).to.be.equal('');
  });

});