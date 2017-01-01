import as from '../awesome-string';
import { expect } from 'chai';

describe('splice', function() {

  it('should splice the string at a given position, number of characters and addition string', function() {
    expect(as.splice('sting like a bee', 0, 0, 'you should ')).to.be.equal('you should sting like a bee');
    expect(as.splice('sting like a bee', 0, 5, 'fly')).to.be.equal('fly like a bee');
    expect(as.splice('sting like a bee', 6, 4, 'as')).to.be.equal('sting as a bee');
    expect(as.splice('sting like a bee', 0, 16, 'float like a butterfly')).to.be.equal('float like a butterfly');
    expect(as.splice('sting like a bee', 0, 16, '')).to.be.equal('');
    expect(as.splice('bee', 3, 0, ' flies')).to.be.equal('bee flies');
    expect(as.splice('bee', 10, 0, ' flies')).to.be.equal('bee flies');
    expect(as.splice('sting like a bee', 0, 0, '')).to.be.equal('sting like a bee');
    expect(as.splice('bee', 10, 100, ' flies')).to.be.equal('bee flies');
    expect(as.splice('bee', 100, 100, ' is an insect')).to.be.equal('bee is an insect');
    expect(as.splice('bee', 100, -1, ' is an insect')).to.be.equal('bee is an insect');
  });

  it('should splice the string at a given negative position, number of characters and addition string', function() {
    expect(as.splice('days', -1, 1, '')).to.be.equal('day');
    expect(as.splice('days', -1, 1, ' and night')).to.be.equal('day and night');
    expect(as.splice('make the days count', -5, 5, 'matter')).to.be.equal('make the days matter');
    expect(as.splice('make the days count', -5, 0, 'matter and ')).to.be.equal('make the days matter and count');
    expect(as.splice('make the days count', -19, 19, 'matter')).to.be.equal('matter');
    expect(as.splice('make the days count', -19, 19, '')).to.be.equal('');
    expect(as.splice('make the days count', -100, 19, 'matter')).to.be.equal('matter');
    expect(as.splice('make the days count', -100, 100, 'matter')).to.be.equal('matter');
  });

  it('should delete from string at a given position by number of characters', function() {
    expect(as.splice('suffer now then be champion', 6, 4)).to.be.equal('suffer then be champion');
    expect(as.splice('champion', -1, 0)).to.be.equal('champion');
    expect(as.splice('champion', 0, 0)).to.be.equal('champion');
    expect(as.splice('champion', 1, 0)).to.be.equal('champion');
    expect(as.splice('champion', 5)).to.be.equal('champ');
    expect(as.splice('champion', 0)).to.be.equal('');
  });

  it('should splice the string representation of an object', function() {
    expect(as.splice(['paradise'], 0, 0, 'this is ')).to.be.equal('this is paradise');
    expect(as.splice({
      toString: function() {
        return 'paradise';
      }
    }, 5, 1, 'I')).to.be.equal('paradIse');
  });

  it('should clear the string for null or undefined arguments', function() {
    expect(as.splice('champion')).to.be.equal('');
    expect(as.splice('champion', undefined, null)).to.be.equal('');
    expect(as.splice('champion', null, null, null)).to.be.equal('');
    expect(as.splice()).to.be.equal('');
  });

});