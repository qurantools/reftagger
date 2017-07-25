# RefTagger

[![Travis build status](http://img.shields.io/travis/alkotob/reftagger.svg?style=flat)](https://travis-ci.org/alkotob/reftagger)
[![Code Climate](https://codeclimate.com/github/alkotob/reftagger/badges/gpa.svg)](https://codeclimate.com/github/alkotob/reftagger)
[![Test Coverage](https://codeclimate.com/github/alkotob/reftagger/badges/coverage.svg)](https://codeclimate.com/github/alkotob/reftagger)
[![Dependency Status](https://david-dm.org/alkotob/reftagger.svg)](https://david-dm.org/alkotob/reftagger)
[![devDependency Status](https://david-dm.org/alkotob/reftagger/dev-status.svg)](https://david-dm.org/alkotob/reftagger#info=devDependencies)

A reftagger for all the Quranic and Biblical references you may have.  If you have
a reference to "An-Nas 1-2" it would automatically insert a tooltip for that ayah
so you don't need to link to it manually, and you don't need to google it separately.
Everything is done inline so you can continue reading.

## Installation

Adding Reftagger to your blog or website is easy. Just place a few lines of code
into the footer of your template files. Copy the code from the text box below
and paste it right before the closing body tag (`</body>`).

```js
<script>
  // Basic installation
  var refTagger = {};

  // Configuration options and defaults
  var refTagger = {
    onPageLoad: true // Load tags on page load
  };

  (function(d, t) {
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = "https://cdn.alkotob.org/lib/reftagger.min.js";
    s.parentNode.insertBefore(g, s);
  }(document, "script"));
</script>
```

## Tooltips

This library uses tippy.js to display its tooltips.  If you already use tippy.js
this could cause some conflict.  Please let us know if this is an issue for you.
