import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('countWhere', function() {

  it('should return the number of characters in a string for a predicate', function() {
    expect(as.countWhere('', as.isAlpha)).to.be.equal(0);
    expect(as.countWhere('africa654', as.isAlpha)).to.be.equal(6);
    expect(as.countWhere('790', as.isAlpha)).to.be.equal(0);
    expect(as.countWhere(PRINTABLE_ASCII, as.isDigit)).to.be.equal(10);
    expect(as.countWhere('****--**--**', function(character) {
      return character === '*';
    })).to.be.equal(8);
    expect(as.countWhere('****--**--**', function() {
      return false;
    })).to.be.equal(0);
  });

  it('should invoke the predicate with correct parameters and context', function() {
    let verifyIndex = 0;
    const context = {};
    const verifyString = '0123456789';
    expect(as.countWhere(verifyString, function(character, index, string) {
      expect(index).to.be.equal(verifyIndex);
      expect(this).to.be.equal(context);
      expect(string).to.be.equal(verifyString);
      expect(character).to.be.equal(verifyString[verifyIndex]);
      verifyIndex++;
      return true;
    }, context)).to.be.equal(10);
  });


  it('should return the number of characters in a number for a predicate', function() {
    expect(as.countWhere(123, as.isDigit)).to.be.equal(3);
    expect(as.countWhere(0, as.isDigit)).to.be.equal(1);
    expect(as.countWhere(-1.5, as.isDigit)).to.be.equal(2);
  });

  it('should return the number of characters in a string representation of an object for a predicate', function() {
    expect(as.countWhere(['droplet'], as.isDigit)).to.be.equal(0);
    expect(as.countWhere({
      toString: function() {
        return 'homo sapiens';
      }
    }, as.isAlphaDigit)).to.be.equal(11);
  });

  it('should return zero for a non function predicate', function() {
    expect(as.countWhere('africa')).to.be.equal(0);
    expect(as.countWhere('africa', undefined)).to.be.equal(0);
    expect(as.countWhere('africa', null)).to.be.equal(0);
    expect(as.countWhere('africa', 'africa')).to.be.equal(0);
    expect(as.countWhere('africa', 0)).to.be.equal(0);
    expect(as.countWhere()).to.be.equal(0);
  });

});