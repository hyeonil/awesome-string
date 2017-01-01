import { expect } from 'chai';
import getGlobalObject from '../../src/helper/object/get_global';
import awesomeString from '../awesome-string';

describe('noConflict', function() {

  it('should return Awesome String library instance and restore as global variable', function() {
    const globalObject = getGlobalObject();
    globalObject.as = awesomeString;
    const awesome = awesomeString.noConflict();
    expect(awesome).to.be.equal(awesomeString);
    expect(globalObject.as).to.be.equal(undefined);
  });

  it('should return Awesome String library instance and not modify as global variable', function() {
    const globalObject = getGlobalObject();
    const awesome = awesomeString.noConflict();
    expect(awesome).to.be.equal(awesomeString);
    expect(globalObject.as).to.be.equal(undefined);
  });

});