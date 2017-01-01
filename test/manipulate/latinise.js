import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('latinise', function() {

  it('should latinise a string', function() {
    expect(as.latinise('')).to.be.equal('');
    expect(as.latinise('moldova')).to.be.equal('moldova');
    expect(as.latinise('cafe\u0301')).to.be.equal('cafe');
    expect(as.latinise('ma\xF1ana')).to.be.equal('manana');
    expect(as.latinise('man\u0303ana')).to.be.equal('manana');
    expect(as.latinise('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal('foobar');
    expect(as.latinise('cafe\u0301')).to.be.equal('cafe');
    expect(as.latinise('colecção cópias críticos é tão')).to.be.equal('coleccao copias criticos e tao');
    expect(as.latinise('književnošću čuvanje')).to.be.equal('knjizevnoscu cuvanje');
    expect(as.latinise('anglikonų šiurkščios užrašinėti')).to.be.equal('anglikonu siurkscios uzrasineti');
    expect(as.latinise('Schuß für Pfarrerstöchter')).to.be.equal('Schus fur Pfarrerstochter');
    expect(as.latinise('publicó éxito nació María')).to.be.equal('publico exito nacio Maria');
    expect(as.latinise('Charlotte Brontë')).to.be.equal('Charlotte Bronte');
    expect(as.latinise('vecākā no māsām Brontē')).to.be.equal('vecaka no masam Bronte');
    expect(as.latinise('Şarlotta Brontenin özü')).to.be.equal('Sarlotta Brontenin ozu');
    expect(as.latinise('Wkrótce po ślubie pisarka zaszła w ciążę')).to.be.equal('Wkrotce po slubie pisarka zaszla w ciaze');
    expect(as.latinise("Dès l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencée par certaines sources d'inspiration"))
      .to.be.equal("Des l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencee par certaines sources d'inspiration");
    expect(as.latinise('Există peste 13.800 de localități în România'))
      .to.be.equal('Exista peste 13.800 de localitati in Romania');
    expect(as.latinise('août décembre')).to.be.equal('aout decembre');
    expect(as.latinise('Україна розташована в південно-східній частині Європи'))
      .to.be.equal('Ukrayina roztashovana v pivdenno-shidnij chastini Yevropi');
    expect(as.latinise('\t\n')).to.be.equal('\t\n');
    expect(as.latinise('\u2047')).to.be.equal('\u2047');
    expect(as.latinise(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should latinise a string representation of an object', function() {
    expect(as.latinise(['María'])).to.be.equal('Maria');
    expect(as.latinise({
      toString: function() {
        return 'sacó';
      }
    })).to.be.equal('saco');
  });

  it('should not modify numbers', function() {
    expect(as.latinise(100)).to.be.equal('100');
    expect(as.latinise(812)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.latinise()).to.be.equal('');
    expect(as.latinise(undefined)).to.be.equal('');
    expect(as.latinise(null)).to.be.equal('');
  });

});