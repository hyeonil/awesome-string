import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('escapeHtml', function() {

  it('should return the escaped string', function() {
    expect(as.escapeHtml('<>&"\'`')).to.be.equal('&lt;&gt;&amp;&quot;&#x27;&#x60;');
    expect(as.escapeHtml('<p>wonderful world</p>')).to.be.equal('&lt;p&gt;wonderful world&lt;/p&gt;');
    expect(as.escapeHtml(PRINTABLE_ASCII)).to.be.equal(
      ' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~');
  });

  it('should return the escaped string representation of an object', function() {
    expect(as.escapeHtml(['<span>'])).to.be.equal('&lt;span&gt;');
    expect(as.escapeHtml({
      toString: function() {
        return '<script>';
      }
    })).to.be.equal('&lt;script&gt;');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.escapeHtml()).to.be.equal('');
    expect(as.escapeHtml(undefined)).to.be.equal('');
    expect(as.escapeHtml(null)).to.be.equal('');
  });

});