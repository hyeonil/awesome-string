import { expect } from 'chai';
import { REGEXP_SEMVER } from '../const';
import as from '../awesome-string';

describe('version', function() {

  it('should match semantic version number pattern', function() {
    expect(REGEXP_SEMVER.test(as.version)).to.be.true;
  });

});