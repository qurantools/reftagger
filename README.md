# RefTagger

[![Travis build status](http://img.shields.io/travis/alkotob/reftagger.svg?style=flat)](https://travis-ci.org/alkotob/reftagger)
[![Code Climate](https://codeclimate.com/github/alkotob/reftagger/badges/gpa.svg)](https://codeclimate.com/github/alkotob/reftagger)
[![Dependency Status](https://beta.gemnasium.com/badges/github.com/alkotob/reftagger.svg)](https://beta.gemnasium.com/projects/github.com/alkotob/reftagger)
[![Test Coverage](https://codeclimate.com/github/alkotob/reftagger/badges/coverage.svg)](https://codeclimate.com/github/alkotob/reftagger)

A reftagger for all the Quranic and Biblical references you may have.  If you have
a reference to "An-Nas 1-2" it would automatically insert a tooltip for that ayah
so you don't need to link to it manually, and you don't need to google it separately.
Everything is done inline so you can continue reading.

Here is a [demo](https://alkotob.github.io/reftagger/) of the magic.

## Installation

Adding Reftagger to your blog or website is easy. Just place a few lines of code
into the footer of your template files. Copy the code from the text box below
and paste it right before the closing body tag (`</body>`).

```js
<script>
  // Basic installation
  var refTagger = {};

  // Here is the default configuration
  var refTagger = {
    language  : 'en', // Language to display the popup
    onPageLoad: true, // Tag the references on page load
    iframes   : true, // From match.js
    exclude   : [],   // Excludes nodes from parse (like script, head, etc)

    // Specify a theme for the popup, you can write your own theme if you
    // don't prefer the default themes.
    // Options: dark, light, transparent, <custom>
    theme: 'alkotob',

    // Specify the version hierarchy, you can omit translations so that it
    // doesn't use them, if a translation does not contain a book (for example)
    // it will fallback to the next translation in this list.
    versions: ['quran', 'injil', 'tma']
  };

  (function(d, t) {
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = "https://cdn.alkotob.org/lib/reftagger.min.js";
    s.parentNode.insertBefore(g, s);
  }(document, "script"));
</script>
```

## API

If you need more control of your views you can always disable the initial
`onPageLoad` attribute in the configuration, and then call `.tag()` once it is
initialized.

```js
var refTagger = { onPageLoad: false };

// Then later on call
refTagger.tag();

// You can pass the actual DOM context to perform updates
// and it will ignore the rest of the page (great for AJAX sites)
refTagger.tag(document.querySelector("#dynamic-html"));
```

## Tooltips

This library uses tippy.js to display its tooltips.  If you already use tippy.js
this could cause some conflict.  Please let us know if this is an issue for you.

## Available Translations

Here is a list of the available translations and their accessibility online as well as a download link. These are the translations currently available with Reftagger and Alkotob.

| Name                                                   | Format | ID     | Original | Direction | Language | File                                                                                   |
|--------------------------------------------------------|--------|--------|----------|-----------|----------|----------------------------------------------------------------------------------------|
| [Βίβλος (GNT)](https://alkotob.org/gnt)                | bible  | gnt    | true     | ltr       | gr       | [gnt.xml](https://github.com/alkotob/bible-translations/raw/master/data/gnt.xml)       |
| [إنجيل](https://alkotob.org/injil)                     | bible  | injil  | false    | rtl       | ar       | [injil.xml](https://github.com/alkotob/bible-translations/raw/master/data/injil.xml)   |
| [السَّبِيْلُ](https://alkotob.org/sabeel)                   | bible  | sabeel | false    | rtl       | ar       | [sabeel.xml](https://github.com/alkotob/bible-translations/raw/master/data/sabeel.xml) |
| [The Path](https://alkotob.org/sbleng)                 | bible  | sbleng | false    | ltr       | en       | [sbleng.xml](https://github.com/alkotob/bible-translations/raw/master/data/sbleng.xml) |
| [المعنى الصحيح لإنجيل المسيح](https://alkotob.org/tma) | bible  | tma    | false    | rtl       | ar       | [tma.xml](https://github.com/alkotob/bible-translations/raw/master/data/tma.xml)       |
| [الزَّبُورُ](https://alkotob.org/zabur)                    | bible  | zabur  | false    | rtl       | ar       | [zabur.xml](https://github.com/alkotob/bible-translations/raw/master/data/zabur.xml)   |
| [Yusuf Ali](https://alkotob.org/qeng59)                | quran  | qeng59 | false    | ltr       | en       | [qeng59.xml](https://github.com/alkotob/bible-translations/raw/master/data/qeng59.xml) |
| [Transliteration](https://alkotob.org/qeng63)          | quran  | qeng63 | false    | ltr       | en       | [qeng63.xml](https://github.com/alkotob/bible-translations/raw/master/data/qeng63.xml) |
| [Bahasa Indonesia](https://alkotob.org/qind68)         | quran  | qind68 | false    | ltr       | in       | [qind68.xml](https://github.com/alkotob/bible-translations/raw/master/data/qind68.xml) |
| [القرآن الكريم](https://alkotob.org/quran)             | quran  | quran  | true     | rtl       | ar       | [quran.xml](https://github.com/alkotob/bible-translations/raw/master/data/quran.xml)   |
