import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('kebabCase', function() {

  it('should return the kebab case of a string', function() {
    expect(as.kebabCase('bird')).to.be.equal('bird');
    expect(as.kebabCase('BIRD')).to.be.equal('bird');
    expect(as.kebabCase('BirdFlight')).to.be.equal('bird-flight');
    expect(as.kebabCase('bird flight')).to.be.equal('bird-flight');
    expect(as.kebabCase('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
    expect(as.kebabCase('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
    expect(as.kebabCase('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
    expect(as.kebabCase('Restless flycatcher')).to.be.equal('restless-flycatcher');
    expect(as.kebabCase('XMLHttpRequest')).to.be.equal('xml-http-request');
    expect(as.kebabCase('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
    expect(as.kebabCase('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
    expect(as.kebabCase(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    expect(as.kebabCase('****')).to.be.equal('');
    expect(as.kebabCase('****')).to.be.equal('');
    expect(as.kebabCase('-----')).to.be.equal('');
    expect(as.kebabCase('     ')).to.be.equal('');
    expect(as.kebabCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    expect(as.kebabCase('')).to.be.equal('');
  });

  it('should return the kebab case of a non-latin string', function() {
    expect(as.kebabCase('zborul păsării')).to.be.equal('zborul-păsării');
    expect(as.kebabCase('полет птицы')).to.be.equal('полет-птицы');
    expect(as.kebabCase('fuerza de sustentación')).to.be.equal('fuerza-de-sustentación');
    expect(as.kebabCase('skrzydło ptaka składa się')).to.be.equal('skrzydło-ptaka-składa-się');
  });

  it('should not modify numbers', function() {
    expect(as.kebabCase(0)).to.be.equal('0');
    expect(as.kebabCase(1200)).to.be.equal('1200');
    expect(as.kebabCase('8965')).to.be.equal('8965');
  });

  it('should return the kebab case of a string representation of an object', function() {
    expect(as.kebabCase(['bird flight'])).to.be.equal('bird-flight');
    expect(as.kebabCase({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('bird-flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.kebabCase()).to.be.equal('');
    expect(as.kebabCase(undefined)).to.be.equal('');
    expect(as.kebabCase(null)).to.be.equal('');
  });

});