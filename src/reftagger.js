import Quran from './books/quran';
import Bible from './books/bible';

const Reftagger = {
  initialized: false,
  settings: {
    onPageLoad: true
  },
  init() {
    let self = this;

    if (self.initialized) return;

    // Start working on the options
    let options = window.refTagger || {};

    // Update the settings with user defined values
    Object.keys(options).forEach(key => {
      if (typeof self.settings[key] !== 'undefined') {
        self.settings[key] = options[key];
      }
    });

    // Append styles to document
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', 'https://unpkg.com/tippy.js@1.1.3/dist/tippy.css'); // TODO: use own stylesheet
    document.getElementsByTagName('head')[0].appendChild(style);

    // Tag references on page load
    if (self.settings.onPageLoad) {
      window.onload = () => Reftagger.tag();
    }

    // Override the root object
    window.refTagger = self;

    self.initialized = true;
  },
  tag() {
    console.log('tagging on page load');
    return 'hello';
  }
};

// Add https://atomiks.github.io/tippyjs/

Reftagger.init();

export default Reftagger;