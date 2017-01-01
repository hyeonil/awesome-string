import as from '../awesome-string';
import { expect } from 'chai';

describe('split', function() {

  it('should split a string into chunks', function() {
    expect(as.split('stellar bomb', ' ')).to.eql(['stellar', 'bomb']);
    expect(as.split('   ', ' ')).to.eql(['', '', '', '']);
    expect(as.split('dying star', /\s/)).to.eql(['dying', 'star']);
    expect(as.split('*dying*star*', /\*/)).to.eql(['', 'dying', 'star', '']);
    expect(as.split('', '')).to.eql([]);
    expect(as.split('star', '')).to.eql(['s', 't', 'a', 'r']);
  });

  it('should split a number into chunks', function() {
    expect(as.split(0)).to.eql(['0']);
    expect(as.split(1560, '6')).to.eql(['15', '0']);
    expect(as.split(-1.6, /\./)).to.eql(['-1', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(as.split('rising star', ' ')).to.eql(['rising', 'star']);
    expect(as.split({
      toString: function() {
        return 'rising-star';
      }
    }, /\-/)).to.eql(['rising', 'star']);
  });


  it('should return the string as an item of an array for an empty separator', function() {
    expect(as.split('star')).to.eql(['star']);
    expect(as.split('star', null)).to.eql(['star']);
    expect(as.split('star', undefined)).to.eql(['star']);
  });

});