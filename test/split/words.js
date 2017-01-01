import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import as from '../awesome-string';

describe('words', function() {

  it('should split the string into words', function() {
    expect(as.words('123')).to.eql(['123']);
    expect(as.words('15+20=35')).to.eql(['15', '20', '35']);
    expect(as.words('hello')).to.eql(['hello']);
    expect(as.words('  hello   ')).to.eql(['hello']);
    expect(as.words('hello world')).to.eql(['hello', 'world']);
    expect(as.words('12+14-18*400')).to.eql(['12', '14', '18', '400']);
    expect(as.words('gravity can cross dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(as.words('-gravity-can-cross-dimensions-')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(as.words('gravity_can_cross_dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(as.words('*gravity***can****cross&&dimensions++')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(as.words('GravityCanCrossDimensions')).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    expect(as.words('GRAVITYCan')).to.eql(['GRAVITY', 'Can']);
    expect(as.words('GravityCan')).to.eql(['Gravity', 'Can']);
    expect(as.words('GravityCANAttract')).to.eql(['Gravity', 'CAN', 'Attract']);
    expect(as.words('gravityCan')).to.eql(['gravity', 'Can']);
    expect(as.words('Gravity-Can11Cross **Dimensions1Foo')).to.eql(['Gravity', 'Can', '11', 'Cross', 'Dimensions', '1', 'Foo']);
    expect(as.words('Cooper... Cooper... Come in, Cooper.')).to.eql(['Cooper', 'Cooper', 'Come', 'in', 'Cooper']);
    expect(as.words('Newton\'s third law')).to.eql(['Newton', 's', 'third', 'law']);
    expect(as.words('Newton\'s thIrd lAw')).to.eql(['Newton', 's', 'th', 'Ird', 'l', 'Aw']);
    expect(as.words(PRINTABLE_ASCII)).to.eql(['0123456789', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz']);
    expect(as.words('')).to.eql([]);
    expect(as.words()).to.eql([]);
    expect(as.words(' ')).to.eql([]);
    expect(as.words('     ')).to.eql([]);
    expect(as.words('\n')).to.eql([]);
    expect(as.words('***')).to.eql([]);
    expect(as.words('***---')).to.eql([]);
    expect(as.words('***---')).to.eql([]);
    expect(as.words('man\u0303ana')).to.eql(['man\u0303ana']);
    expect(as.words('maN\u0303ana')).to.eql(['ma', 'N\u0303ana']);
    expect(as.words('foo\u0303\u035C\u035D\u035E bar')).to.eql(['foo\u0303\u035C\u035D\u035E', 'bar']);
    expect(as.words('fo-O-O\u0303\u035C\u035D\u035E-bar')).to.eql(['fo', 'O', 'O\u0303\u035C\u035D\u035E', 'bar']);
  });

  it('should split the string with diacritics into words', function() {
    expect(as.words('clasificación biológica.')).to.eql(['clasificación', 'biológica']);
    expect(as.words('BunăZiua')).to.eql(['Bună', 'Ziua']);
    expect(as.words('Bună1ZiUa!')).to.eql(['Bună', '1', 'Zi', 'Ua']);
    expect(as.words('Język /polski wywodzi się z` języka` praindoeuropejskiego za**pośrednictwem+języka-prasłowiańskiego.'))
      .to.eql(['Język', 'polski', 'wywodzi', 'się', 'z', 'języka', 'praindoeuropejskiego', 'za', 'pośrednictwem', 'języka', 'prasłowiańskiego']);
    expect(as.words('Гравитация притягивает все')).to.eql(['Гравитация', 'притягивает', 'все']);
    expect(as.words('Гравитация-Притягивает-ВСЕ!!')).to.eql(['Гравитация', 'Притягивает', 'ВСЕ']);
    expect(as.words('Στις--αρχές** (του) 21ου, αιώνα!')).to.eql(['Στις', 'αρχές', 'του', '21', 'ου', 'αιώνα']);
  });

  it('should split the string representation of an object', function() {
    expect(as.words(['GravityCanCrossDimensions'])).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    expect(as.words({
      toString: function() {
        return 'Gr4v1ty';
      }
    })).to.eql(['Gr', '4', 'v', '1', 'ty']);
  });

  it('should split the string into words using a pattern', function() {
    expect(as.words('1234567890', /\d/g)).to.eql(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    expect(as.words('gravity', /\w{1,2}/g)).to.eql(['gr', 'av', 'it', 'y']);
    expect(as.words('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(as.words('1234567890', /\s/g)).to.eql([]);
  });

  it('should split the string with default pattern for null and undefined', function() {
    expect(as.words('gravity_can_cross_dimensions', null)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(as.words('gravity_can_cross_dimensions', undefined)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
  });
  
});