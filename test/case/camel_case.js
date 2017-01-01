import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('camelCase', function() {

  it('should return the camel case of a string', function() {
    expect(as.camelCase('bird')).to.be.equal('bird');
    expect(as.camelCase('BIRD')).to.be.equal('bird');
    expect(as.camelCase('BirdFlight')).to.be.equal('birdFlight');
    expect(as.camelCase('bird flight')).to.be.equal('birdFlight');
    expect(as.camelCase('San Diego Zoo Safari Park')).to.be.equal('sanDiegoZooSafariPark');
    expect(as.camelCase('-BIRD-FLIGHT-')).to.be.equal('birdFlight');
    expect(as.camelCase('__BIRD___FLIGHT___')).to.be.equal('birdFlight');
    expect(as.camelCase('Restless flycatcher')).to.be.equal('restlessFlycatcher');
    expect(as.camelCase('XMLHttpRequest')).to.be.equal('xmlHttpRequest');
    expect(as.camelCase('weight of up to 12 kg')).to.be.equal('weightOfUpTo12Kg');
    expect(as.camelCase('/home/dmitri/projects/voca')).to.be.equal('homeDmitriProjectsVoca');
    expect(as.camelCase(PRINTABLE_ASCII)).to.be.equal('0123456789AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz');
    expect(as.camelCase('****')).to.be.equal('');
    expect(as.camelCase('****')).to.be.equal('');
    expect(as.camelCase('-----')).to.be.equal('');
    expect(as.camelCase('     ')).to.be.equal('');
    expect(as.camelCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    expect(as.camelCase('')).to.be.equal('');
  });

  it('should return the camel case of a non-latin string', function() {
    expect(as.camelCase('zborul păsării')).to.be.equal('zborulPăsării');
    expect(as.camelCase('полет птицы')).to.be.equal('полетПтицы');
    expect(as.camelCase('fuerza de sustentación')).to.be.equal('fuerzaDeSustentación');
    expect(as.camelCase('skrzydło ptaka składa się')).to.be.equal('skrzydłoPtakaSkładaSię');
  });

  it('should not modify numbers', function() {
    expect(as.camelCase(0)).to.be.equal('0');
    expect(as.camelCase(1200)).to.be.equal('1200');
    expect(as.camelCase('8965')).to.be.equal('8965');
  });

  it('should return the camel case of a string representation of an object', function() {
    expect(as.camelCase(['bird flight'])).to.be.equal('birdFlight');
    expect(as.camelCase({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('birdFlight');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.camelCase()).to.be.equal('');
    expect(as.camelCase(undefined)).to.be.equal('');
    expect(as.camelCase(null)).to.be.equal('');
  });

});