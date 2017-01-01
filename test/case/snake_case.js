import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('snakeCase', function() {

  it('should return the snake case of a string', function() {
    expect(as.snakeCase('bird')).to.be.equal('bird');
    expect(as.snakeCase('BIRD')).to.be.equal('bird');
    expect(as.snakeCase('BirdFlight')).to.be.equal('bird_flight');
    expect(as.snakeCase('bird flight')).to.be.equal('bird_flight');
    expect(as.snakeCase('San Diego Zoo Safari Park')).to.be.equal('san_diego_zoo_safari_park');
    expect(as.snakeCase('-BIRD-FLIGHT-')).to.be.equal('bird_flight');
    expect(as.snakeCase('__BIRD___FLIGHT___')).to.be.equal('bird_flight');
    expect(as.snakeCase('Restless flycatcher')).to.be.equal('restless_flycatcher');
    expect(as.snakeCase('XMLHttpRequest')).to.be.equal('xml_http_request');
    expect(as.snakeCase('weight of up to 12 kg')).to.be.equal('weight_of_up_to_12_kg');
    expect(as.snakeCase('/home/dmitri/projects/voca')).to.be.equal('home_dmitri_projects_voca');
    expect(as.snakeCase(PRINTABLE_ASCII)).to.be.equal('0123456789_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz');
    expect(as.snakeCase('****')).to.be.equal('');
    expect(as.snakeCase('****')).to.be.equal('');
    expect(as.snakeCase('-----')).to.be.equal('');
    expect(as.snakeCase('     ')).to.be.equal('');
    expect(as.snakeCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    expect(as.snakeCase('')).to.be.equal('');
  });

  it('should return the snake case of a non-latin string', function() {
    expect(as.snakeCase('zborul păsării')).to.be.equal('zborul_păsării');
    expect(as.snakeCase('полет птицы')).to.be.equal('полет_птицы');
    expect(as.snakeCase('fuerza de sustentación')).to.be.equal('fuerza_de_sustentación');
    expect(as.snakeCase('skrzydło ptaka składa się')).to.be.equal('skrzydło_ptaka_składa_się');
  });

  it('should not modify numbers', function() {
    expect(as.snakeCase(0)).to.be.equal('0');
    expect(as.snakeCase(1200)).to.be.equal('1200');
    expect(as.snakeCase('8965')).to.be.equal('8965');
  });

  it('should return the snake case of a string representation of an object', function() {
    expect(as.snakeCase(['bird flight'])).to.be.equal('bird_flight');
    expect(as.snakeCase({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('bird_flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(as.snakeCase()).to.be.equal('');
    expect(as.snakeCase(undefined)).to.be.equal('');
    expect(as.snakeCase(null)).to.be.equal('');
  });

});