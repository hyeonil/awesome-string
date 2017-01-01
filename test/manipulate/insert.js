import { expect } from 'chai';
import as from '../awesome-string';

describe('insert', function() {

  it('should insert into a string at specified position', function() {
    expect(as.insert('autumn', 'nice ', 0)).to.be.equal('nice autumn');
    expect(as.insert('autumn', 'nice ')).to.be.equal('nice autumn');
    expect(as.insert('autumn', 'nice', 1)).to.be.equal('aniceutumn');
    expect(as.insert('autumn', 'nice', 5)).to.be.equal('autumnicen');
    expect(as.insert('autumn', ' is nice', 6)).to.be.equal('autumn is nice');
    expect(as.insert('', 'nice', 0)).to.be.equal('nice');
    expect(as.insert('autumn', '', 1)).to.be.equal('autumn');
    expect(as.insert('autumn', '', 6)).to.be.equal('autumn');
  });

  it('should not insert into a string when position is out of bounds', function() {
    expect(as.insert('autumn', 'nice ', 100)).to.be.equal('autumn');
    expect(as.insert('autumn', 'nice', -100)).to.be.equal('autumn');
    expect(as.insert('autumn', 'nice', 7)).to.be.equal('autumn');
    expect(as.insert('autumn', 'nice', -1)).to.be.equal('autumn');
    expect(as.insert('', 'nice', 1)).to.be.equal('');
  });

  it('should insert into a string representation of an object at specified position', function() {
    expect(as.insert(['paradise'], '**', 2)).to.be.equal('pa**radise');
    expect(as.insert({
      toString: function() {
        return 'Tony';
      }
    }, ' Montana', 4)).to.be.equal('Tony Montana');
  });

  it('should not insert into a string on null or undefined arguments', function() {
    expect(as.insert()).to.be.equal('');
    expect(as.insert(null)).to.be.equal('');
    expect(as.insert(undefined)).to.be.equal('');
    expect(as.insert(undefined, undefined)).to.be.equal('');
  });

});