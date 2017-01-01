import as from '../awesome-string';
import { expect } from 'chai';

describe('chain', function() {

  it('should calculate the result using explicit chaining', function() {
    expect(
      as.chain('Hello world')
        .value()
    ).to.equal('Hello world');
    expect(
      as.chain('  Hello world  ')
        .trim()
        .value()
    ).to.equal('Hello world');
    expect(
      as.chain('world')
        .isAlpha()
        .value()
    ).to.equal(true);
    expect(
      as.chain('Hello world')
        .lowerCase()
        .replace('hello', 'hi')
        .upperCase()
        .value()
    ).to.equal('HI WORLD');
  });

  it('should calculate the result using implicit chaining', function() {
    expect(
      as('Hello world')
        .lowerCase()
        .words()
    ).to.eql(['hello', 'world']);
    expect(
      as('  Hello world  ')
        .trimLeft()
        .count()
    ).to.equal(13);
    expect(
      as('7 days')
        .replace(/\sdays/, '')
        .isDigit()
    ).to.equal(true);
    expect(
      as('7 days')
        .replace(/\sdays/, '')
        .value()
    ).to.equal('7');
  });

  it('should transform implicit into explicit chaining', function() {
    expect(
      as('Hello world')
        .chain()
        .lowerCase()
        .words()
        .value()
    ).to.eql(['hello', 'world']);
    expect(
      as('15')
        .chain()
        .isNumeric()
        .value()
    ).to.equal(true);
    expect(
      as('15')
        .chain()
        .isNumeric()
        .thru(function(isNumeric) {
          return isNumeric ? 1 : 0;
        })
        .value()
    ).to.be.equal(1);
  });

  it('should allow to pass thru the wrapped value', function() {
    expect(
      as('Hello world')
        .chain()
        .lowerCase()
        .words()
        .thru(function(words) {
          return words[0];
        })
        .value()
    ).to.equal('hello');
    expect(
      as.chain('15')
        .isNumeric()
        .thru()
        .value()
    ).to.equal(true);
  });

  it('wrapper object should coerce to a primitive', function() {
    expect(
      'nice' + as.chain(' evening ').trimRight()
    ).to.be.equal('nice evening');
    expect(
      as('clouds').upperCase() == 'CLOUDS'
    ).to.be.true;
  });

  it('wrapper object should coerce to a string', function() {
    expect(
      'nice ' + as.chain('hello world').words()
    ).to.be.equal('nice hello,world');
    expect(
      as('green tree').split(' ') == 'green,tree'
    ).to.be.true;
  });

  it('wrapper object should provide toJSON method', function() {
    expect(
      JSON.stringify(as.chain('happy coding').upperCase().split(' '))
    ).to.be.equal('["HAPPY","CODING"]');
  });

});