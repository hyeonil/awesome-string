import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('slugify', function() {

  it('should slugify the string', function() {
    expect(as.slugify('bird')).to.be.equal('bird');
    expect(as.slugify('BIRD')).to.be.equal('bird');
    expect(as.slugify('BirdFlight')).to.be.equal('bird-flight');
    expect(as.slugify('bird flight')).to.be.equal('bird-flight');
    expect(as.slugify('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
    expect(as.slugify('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
    expect(as.slugify('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
    expect(as.slugify('Restless flycatcher')).to.be.equal('restless-flycatcher');
    expect(as.slugify('XMLHttpRequest')).to.be.equal('xml-http-request');
    expect(as.slugify('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
    expect(as.slugify('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
    expect(as.slugify(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    expect(as.slugify('****')).to.be.equal('');
    expect(as.slugify('****')).to.be.equal('');
    expect(as.slugify('-----')).to.be.equal('');
    expect(as.slugify('     ')).to.be.equal('');
    expect(as.slugify('\n\n\n\n   ***\t\t')).to.be.equal('');
    expect(as.slugify('')).to.be.equal('');
  });

  it('should slugify the string of a non-latin string', function() {
    expect(as.slugify('zborul păsării')).to.be.equal('zborul-pasarii');
    expect(as.slugify('fuerza de sustentación')).to.be.equal('fuerza-de-sustentacion');
    expect(as.slugify('skrzydło ptaka składa się')).to.be.equal('skrzydlo-ptaka-sklada-sie');
    expect(as.slugify('Україна розташована в південно-східній частині Європи'))
      .to.be.equal('ukrayina-roztashovana-v-pivdenno-shidnij-chastini-yevropi');
    expect(as.slugify('man\u0303ana')).to.be.equal('manana');
    expect(as.slugify('foo\u0303\u035C\u035D\u035E bar')).to.be.equal('foo-bar');
  });

  it('should not modify numbers', function() {
    expect(as.slugify(0)).to.be.equal('0');
    expect(as.slugify(1200)).to.be.equal('1200');
    expect(as.slugify('8965')).to.be.equal('8965');
  });

  it('should slugify the string representation of an object', function() {
    expect(as.slugify(['bird flight'])).to.be.equal('bird-flight');
    expect(as.slugify({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('bird-flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.slugify()).to.be.equal('');
    expect(as.slugify(undefined)).to.be.equal('');
    expect(as.slugify(null)).to.be.equal('');
  });

});