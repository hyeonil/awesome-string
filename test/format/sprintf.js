import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('sprintf', function() {

  it('should return a string according to string type formatting', function () {
    expect(as.sprintf('%s', 'string')).to.be.equal('string');
    expect(as.sprintf('Hello %s!', 'World')).to.be.equal('Hello World!');
    expect(as.sprintf('%s %s!', 'Hello', 'World')).to.be.equal('Hello World!');
    expect(as.sprintf('%s %s!', '%s', '%s')).to.be.equal('%s %s!');
    expect(as.sprintf('Hello %5s!', 'World')).to.be.equal('Hello World!');
    expect(as.sprintf('Hello %3s!', 'World')).to.be.equal('Hello World!');
    expect(as.sprintf('Hello %8s!', 'World')).to.be.equal('Hello    World!');
    expect(as.sprintf('%s%s%s%s%s', 'Alexander', ' ', 'the', ' ', 'Great')).to.be.equal('Alexander the Great');
    expect(as.sprintf('Alexander the %08s', 'Great')).to.be.equal('Alexander the 000Great');
    expect(as.sprintf('Alexander the % 8s', 'Great')).to.be.equal('Alexander the    Great');
    expect(as.sprintf("%'-10s the %s", 'Alexander', 'Great')).to.be.equal('-Alexander the Great');
    expect(as.sprintf("%'.12s the %09s", 'Alexander', 'Great')).to.be.equal('...Alexander the 0000Great');
    expect(as.sprintf('%-12s', 'Alexander')).to.be.equal('Alexander   ');
    expect(as.sprintf('%+-12s', 'Alexander')).to.be.equal('Alexander   ');
    expect(as.sprintf('%.4s the Great', 'Alexander')).to.be.equal('Alex the Great');
    expect(as.sprintf('%.9s the Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(as.sprintf('%.0s the Great', 'Alexander')).to.be.equal(' the Great');
    expect(as.sprintf('%10.8s the Great', 'Alexander')).to.be.equal('  Alexande the Great');
    expect(as.sprintf('%\'-10.6s %\'1-12.4s', 'Persian', 'Empire')).to.be.equal('----Persia Empi11111111');
    expect(as.sprintf('%2$s the %1$s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(as.sprintf('%2$s', 'Great', 'Alexander')).to.be.equal('Alexander');
    expect(as.sprintf('%2$\'012s the %1$.4s', 'Great', 'Alexander')).to.be.equal('000Alexander the Grea');
    expect(as.sprintf('%%%1$\'q-12.4s%%s', 'Alexander')).to.be.equal('%Alexqqqqqqqq%s');
    expect(as.sprintf('%2$s the %s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(as.sprintf('%1$s the %s', 'Great')).to.be.equal('Great the Great');
  });

  it('should return a string according to decimal integer type formatting', function () {
    expect(as.sprintf('%d', 1)).to.be.equal('1');
    expect(as.sprintf('%i', 1)).to.be.equal('1');
    expect(as.sprintf('%d %d %d', 1, 0, -100)).to.be.equal('1 0 -100');
    expect(as.sprintf('%+d %+d', 10, -10)).to.be.equal('+10 -10');
    expect(as.sprintf("%+'t4d %4d", 9, 0)).to.be.equal('tt+9    0');
    expect(as.sprintf("%010i", 90)).to.be.equal('0000000090');
    expect(as.sprintf("%+ 8d", 88)).to.be.equal('     +88');
    expect(as.sprintf("%d+%d=%d", 9, 1, 10)).to.be.equal('9+1=10');
    expect(as.sprintf("%3$04d-%2$04d=%1$04d", 9, 1, 10)).to.be.equal('0010-0001=0009');
    expect(as.sprintf("%+'T-5d", 15)).to.be.equal('+15TT');
    expect(as.sprintf("%d", 1.5e+3)).to.be.equal('1500');
    expect(as.sprintf("%d", '15NN')).to.be.equal('15');
    expect(as.sprintf("%d", '1.6')).to.be.equal('1');
    expect(as.sprintf("%d", '1.5e+3')).to.be.equal('1');
    expect(as.sprintf("%d", 'NN15')).to.be.equal('0');
    expect(as.sprintf("%d %d", '', 15)).to.be.equal('0 15');
    expect(as.sprintf("%d", '+')).to.be.equal('0');
  });

  it('should return a string according to binary integer type formatting', function () {
    expect(as.sprintf('%b', 1)).to.be.equal('1');
    expect(as.sprintf('%b %b 0b%b', 1, 0, 10)).to.be.equal('1 0 0b1010');
    expect(as.sprintf('%+b %+b', 10, 10)).to.be.equal('1010 1010');
    expect(as.sprintf("%+'t6b %4b", 9, 0)).to.be.equal('tt1001    0');
    expect(as.sprintf("%010b", 90)).to.be.equal('0001011010');
    expect(as.sprintf("%+ 8b", 88)).to.be.equal(' 1011000');
    expect(as.sprintf("%b+%b=%b", 9, 1, 10)).to.be.equal('1001+1=1010');
    expect(as.sprintf("%3$04b-%2$04b=%1$04b", 4, 1, 5)).to.be.equal('0101-0001=0100');
    expect(as.sprintf("%+'T-5b", 15)).to.be.equal('1111T');
    expect(as.sprintf("%b", 1.5e+3)).to.be.equal('10111011100');
    expect(as.sprintf("%b", '15NN')).to.be.equal('1111');
    expect(as.sprintf("%b", '1.6')).to.be.equal('1');
    expect(as.sprintf("%b", '1.5e+3')).to.be.equal('1');
    expect(as.sprintf("%b", 'NN15')).to.be.equal('0');
    expect(as.sprintf("%b %b", '', 15)).to.be.equal('0 1111');
    expect(as.sprintf("%b", '+')).to.be.equal('0');
    expect(as.sprintf("%b %b", -1, -10)).to.be.equal('11111111111111111111111111111111 11111111111111111111111111110110');
  });

  it('should return a string according to octal integer type formatting', function () {
    expect(as.sprintf('%o', 1)).to.be.equal('1');
    expect(as.sprintf('%o %o 0%o', 1, 0, 10)).to.be.equal('1 0 012');
    expect(as.sprintf('%+o %+o', 10, 10)).to.be.equal('12 12');
    expect(as.sprintf("%+'t6o %4o", 9, 0)).to.be.equal('tttt11    0');
    expect(as.sprintf("%010o", 90)).to.be.equal('0000000132');
    expect(as.sprintf("%+ 8o", 88)).to.be.equal('     130');
    expect(as.sprintf("%o+%o=%o", 9, 1, 10)).to.be.equal('11+1=12');
    expect(as.sprintf("%3$04o-%2$04o=%1$04o", 35, 5, 40)).to.be.equal('0050-0005=0043');
    expect(as.sprintf("%+'T-5o", 15)).to.be.equal('17TTT');
    expect(as.sprintf("%o", 1.5e+3)).to.be.equal('2734');
    expect(as.sprintf("%o", '15NN')).to.be.equal('17');
    expect(as.sprintf("%o", '1.6')).to.be.equal('1');
    expect(as.sprintf("%o", '1.5e+3')).to.be.equal('1');
    expect(as.sprintf("%o", 'NN15')).to.be.equal('0');
    expect(as.sprintf("%o %o", '', 15)).to.be.equal('0 17');
    expect(as.sprintf("%o", '+')).to.be.equal('0');
    expect(as.sprintf("%o %o", -1, -10)).to.be.equal('37777777777 37777777766');
  });

  it('should return a string according to hexadecimal integer type formatting', function () {
    expect(as.sprintf('%x-%X', 1, 14)).to.be.equal('1-E');
    expect(as.sprintf('%x %x 0X%x', 1, 0, 20)).to.be.equal('1 0 0X14');
    expect(as.sprintf('%+x %+x', 10, 50)).to.be.equal('a 32');
    expect(as.sprintf("%+'t6x %4x", 30, 0)).to.be.equal('tttt1e    0');
    expect(as.sprintf("%010x", 90)).to.be.equal('000000005a');
    expect(as.sprintf("%+ 8x", 88)).to.be.equal('      58');
    expect(as.sprintf("%x+%x=%x", 90, 10, 100)).to.be.equal('5a+a=64');
    expect(as.sprintf("%3$04x-%2$04x=%1$04x", 35, 5, 40)).to.be.equal('0028-0005=0023');
    expect(as.sprintf("%+'T-5x", 15)).to.be.equal('fTTTT');
    expect(as.sprintf("%1$x %1$X", 1.5e+3)).to.be.equal('5dc 5DC');
    expect(as.sprintf("%x", '15NN')).to.be.equal('f');
    expect(as.sprintf("%x", '1.6')).to.be.equal('1');
    expect(as.sprintf("%x", '1.5e+3')).to.be.equal('1');
    expect(as.sprintf("%x", 'NN15')).to.be.equal('0');
    expect(as.sprintf("%x %x", '', 15)).to.be.equal('0 f');
    expect(as.sprintf("%x", '+')).to.be.equal('0');
    expect(as.sprintf("%x %x", -1, -10)).to.be.equal('ffffffff fffffff6');
  });

  it('should return a string according to unsigned decimal integer type formatting', function () {
    expect(as.sprintf('%u-%u', 1, 14)).to.be.equal('1-14');
    expect(as.sprintf('%u %u %u', 1, 0, 20)).to.be.equal('1 0 20');
    expect(as.sprintf('%+u %+u', 10, 50)).to.be.equal('10 50');
    expect(as.sprintf("%+'t6u %4u", 30, 0)).to.be.equal('tttt30    0');
    expect(as.sprintf("%010u", 90)).to.be.equal('0000000090');
    expect(as.sprintf("%+ 8u", 88)).to.be.equal('      88');
    expect(as.sprintf("%u+%u=%u", 90, 10, 100)).to.be.equal('90+10=100');
    expect(as.sprintf("%3$04u-%2$04u=%1$04u", 35, 5, 40)).to.be.equal('0040-0005=0035');
    expect(as.sprintf("%+'T-5u", 15)).to.be.equal('15TTT');
    expect(as.sprintf("%1$u %1$u", 1.5e+3)).to.be.equal('1500 1500');
    expect(as.sprintf("%u", '15NN')).to.be.equal('15');
    expect(as.sprintf("%u", '1.6')).to.be.equal('1');
    expect(as.sprintf("%u", '1.5e+3')).to.be.equal('1');
    expect(as.sprintf("%u", 'NN15')).to.be.equal('0');
    expect(as.sprintf("%u %u", '', 15)).to.be.equal('0 15');
    expect(as.sprintf("%u", '+')).to.be.equal('0');
    expect(as.sprintf("%u %u", -1, -10)).to.be.equal('4294967295 4294967286');
  });

  it('should return a string according to ascii integer type formatting', function () {
    expect(as.sprintf('%c %c %c', 65, 0x0020, 48)).to.be.equal('A   0');
    expect(as.sprintf('%5c', 65)).to.be.equal('    A');
    expect(as.sprintf('%02c', 65)).to.be.equal('0A');
    expect(as.sprintf('%-5c', 65)).to.be.equal('A    ');
    expect(as.sprintf('%+\'t-4c', '110')).to.be.equal('nttt');
  });

  it('should return a string according to float type formatting', function () {
    expect(as.sprintf('%f %f', 1, 0)).to.be.equal('1.000000 0.000000');
    expect(as.sprintf('%+f+%+f', 50.123456789, 0)).to.be.equal('+50.123457++0.000000');
    expect(as.sprintf('%1$.0f %1$.1f %1$.2f', 1.57)).to.be.equal('2 1.6 1.57');
    expect(as.sprintf('%.2f %0.2f', 0, 0)).to.be.equal('0.00 0.00');
    expect(as.sprintf('%4f %05.2f', -15.789, 1.27)).to.be.equal('-15.789000 01.27');
    expect(as.sprintf("%'f10f", 1.5)).to.be.equal('ff1.500000');
    expect(as.sprintf("%+-12f", 101.101)).to.be.equal('+101.101000 ');
    expect(as.sprintf("%+'s-15.10f", 9.7654321)).to.be.equal('+9.7654321000ss');
    expect(as.sprintf("%06.2f", 8)).to.be.equal('008.00');
    expect(as.sprintf('%f %.1f', '34.111', '-15.67')).to.be.equal('34.111000 -15.7');
    expect(as.sprintf('%.3f %.2f', '1.123456e+0', '1.3E+2')).to.be.equal('1.123 130.00');
    expect(as.sprintf('%.3f', '-567.123456e+6')).to.be.equal('-567123456.000');
    expect(as.sprintf('%f %f %f', '1FF', '-15.67TUU', '.1')).to.be.equal('1.000000 -15.670000 0.100000');
    expect(as.sprintf('%f %f %f', 'FF', '', '+')).to.be.equal('0.000000 0.000000 0.000000');
  });

  it('should return a string according to scientific float type formatting', function () {
    expect(as.sprintf('%e %e %E', 100, 0, .1)).to.be.equal('1.000000e+2 0.000000e+0 1.000000E-1');
    expect(as.sprintf('%+e+%+e', 50.123456789, 0)).to.be.equal('+5.012346e+1++0.000000e+0');
    expect(as.sprintf('%1$.0e %1$.1e %1$.2e', 1.57)).to.be.equal('2e+0 1.6e+0 1.57e+0');
    expect(as.sprintf('%.2e %0.2e', 0, 0)).to.be.equal('0.00e+0 0.00e+0');
    expect(as.sprintf('%.0e %.0e', 0, 15.7)).to.be.equal('0e+0 2e+1');
    expect(as.sprintf('%4e %08.2e', -15.789, 1.27)).to.be.equal('-1.578900e+1 01.27e+0');
    expect(as.sprintf("%'f15e", 0.105)).to.be.equal('ffff1.050000e-1');
    expect(as.sprintf("%+-14e", 101.101)).to.be.equal('+1.011010e+2  ');
    expect(as.sprintf("%+'s-20.10e", 0.097654321)).to.be.equal('+9.7654321000e-2ssss');
    expect(as.sprintf("%08.2e", 8)).to.be.equal('08.00e+0');
    expect(as.sprintf('%e %.1e', '34.111', '-15.67')).to.be.equal('3.411100e+1 -1.6e+1');
    expect(as.sprintf('%.3E %.2E', '1.123456e+0', '1.3E+2')).to.be.equal('1.123E+0 1.30E+2');
    expect(as.sprintf('%.4e', '-567.123456e+6')).to.be.equal('-5.6712e+8');
    expect(as.sprintf('%e %e %e', '1FF', '-15.67TUU', '.1')).to.be.equal('1.000000e+0 -1.567000e+1 1.000000e-1');
    expect(as.sprintf('%e %e %e', 'FF', '', '+')).to.be.equal('0.000000e+0 0.000000e+0 0.000000e+0');
  });

  it('should return a string according to short float type formatting', function () {
    expect(as.sprintf('%g %g %g', 100, 0, .1)).to.be.equal('100 0 0.1');
    expect(as.sprintf('%+g+%+g', 50.123456789, 0)).to.be.equal('+50.1235++0');
    expect(as.sprintf('%1$.0g %1$.1g %1$.2g', 1.57)).to.be.equal('2 2 1.6');
    expect(as.sprintf('%.2g %0.2g', 0, 0)).to.be.equal('0 0');
    expect(as.sprintf('%.0g', 0)).to.be.equal('0');
    expect(as.sprintf('%.0g %.0g', 0, 15.7)).to.be.equal('0 2e+1');
    expect(as.sprintf('%4g %08.2g', -15.789, 1.27)).to.be.equal('-15.789 000001.3');
    expect(as.sprintf("%'f15g", 0.105)).to.be.equal('ffffffffff0.105');
    expect(as.sprintf("%+-14g", 101.101)).to.be.equal('+101.101      ');
    expect(as.sprintf("%+'s-20.10g", 0.0976543216)).to.be.equal('+0.0976543216sssssss');
    expect(as.sprintf("%+'s-20.8g", 0.0976543216)).to.be.equal('+0.097654322ssssssss');
    expect(as.sprintf("%08.2g", 8)).to.be.equal('00000008');
    expect(as.sprintf('%g %.1G', '34.111', '-15.67')).to.be.equal('34.111 -2E+1');
    expect(as.sprintf('_%.3G_%.2G_!1234567890*', '1.123456e+0', '1.3E+2')).to.be.equal('_1.12_1.3E+2_!1234567890*');
    expect(as.sprintf('%.4g', '-567.123456e+6')).to.be.equal('-5.671e+8');
    expect(as.sprintf('%g %G %g', '1FF', '-15.67TUU', '.1')).to.be.equal('1 -15.67 0.1');
    expect(as.sprintf('%g %G %g', 'FF', '', '+')).to.be.equal('0 0 0');
  });

  it('should return a string according to format', function () {
    expect(as.sprintf('%s costs $%.2f', 'Coffee', 2)).to.be.equal('Coffee costs $2.00');
    expect(as.sprintf('%%s like %s', 'Coffee')).to.be.equal('%s like Coffee');
    expect(as.sprintf("Full format: %'*10s %+d %i %04b %c %o %u %X %.0f %e %g %%",
      'string', 18, -5, 4, 65, 8, 401, 255, 8.9, 50.12, 10.123456789
    )).to.be.equal('Full format: ****string +18 -5 0100 A 10 401 FF 9 5.012000e+1 10.1235 %');
    expect(as.sprintf('%s%d%%%s', 'word', 10, 'word')).to.be.equal('word10%word');
  });

  it('should ignore specifiers with double percent characters', function () {
    expect(as.sprintf('%%s')).to.be.equal('%s');
    expect(as.sprintf('%%s %s', 'Persian')).to.be.equal('%s Persian');
    expect(as.sprintf('%% %%')).to.be.equal('% %');
    expect(as.sprintf('%%%% %%%%%s', 'Babylon')).to.be.equal('%% %%Babylon');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function () {
    expect(as.sprintf.bind(as, '%s')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(as.sprintf.bind(as, '%s %s')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(as.sprintf.bind(as, '%s %s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(as.sprintf.bind(as, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(as.sprintf.bind(as, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(as.sprintf.bind(as, '%a', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(as.sprintf.bind(as, PRINTABLE_ASCII, 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(as.sprintf.bind(as, '%s the %y', 'Alexander', 'Great')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(as.sprintf.bind(as, '%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(as.sprintf.bind(as, '%%%%% %%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(as.sprintf.bind(as, '%0$s', 'Alexander')).to.throw(Error, 'sprintf(): Argument number must be greater than zero');
  });

  it('should return an unmodified string for missing formatting specifiers', function () {
    expect(as.sprintf('Without formatting')).to.be.equal('Without formatting');
    expect(as.sprintf('')).to.be.equal('');
    expect(as.sprintf()).to.be.equal('');
    expect(as.sprintf(undefined)).to.be.equal('');
    expect(as.sprintf(null)).to.be.equal('');
  });

});