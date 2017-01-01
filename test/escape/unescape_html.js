import as from '../awesome-string';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('unescapeHtml', function() {

  it('should return the unescaped', function() {
    expect(as.unescapeHtml('&lt;&gt;&amp;&quot;&#x27;&#x60;')).to.be.equal('<>&"\'`');
    expect(as.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    expect(as.unescapeHtml('&#x003C;p&#0062;wonderful world&#x003C;/p&#0062;')).to.be.equal('<p>wonderful world</p>');
    expect(as.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    expect(as.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    expect(as.unescapeHtml('&lt; &#x03c; &#060; &gt; &#x03e; &#062; &amp; &#x026; &#038; &quot; &#x022; &#034; &#x027; &#039; &#x060; &#096;'))
      .to.be.equal('< < < > > > & & & " " " \' \' ` `');
    expect(as.unescapeHtml(' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~'))
      .to.be.equal(PRINTABLE_ASCII);
    expect(as.unescapeHtml('<>&"\'`')).to.be.equal('<>&"\'`');
  });

  it('should return the unescaped string representation of an object', function() {
    expect(as.unescapeHtml(['&lt;span&gt;'])).to.be.equal('<span>');
    expect(as.unescapeHtml({
      toString: function() {
        return '&lt;script&gt;';
      }
    })).to.be.equal('<script>');
  });

  it('should return an empty string for null or undefined', function() {
    expect(as.unescapeHtml()).to.be.equal('');
    expect(as.unescapeHtml(undefined)).to.be.equal('');
    expect(as.unescapeHtml(null)).to.be.equal('');
  });

});