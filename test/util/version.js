import as from '../awesome-string';
import { expect } from 'chai';
import { REGEXP_SEMVER } from '../const';

describe('version', function() {

  it('should match semantic version number pattern', function() {
    expect(REGEXP_SEMVER.test(as.version)).to.be.true;
  });

});