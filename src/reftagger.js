import Tippy from 'tippy.js';
import Quran from './books/quran';
import Bible from './books/bible';
import tooltipHTML from './templates/tooltip';

function createPopup() {
  const template = document.getElementById('alkotob-tooltip');
  const tip = Tippy('.alkotob-ayah', {
    arrow: true,
    html: '#alkotob-tooltip',
    interactive: true,
    flipDuration: 0, // prevent a transition once tooltip size changes and updates position
    onShow(el) {
      if (tip.loading) return;
      tip.loading = true;

      console.log('initializing html');

      fetch('https://unsplash.it/200/?random')
        .then(resp => resp.blob())
        .then(blob => {
          const tipEl = tip.getReferenceElement(this);
          const refData = tip.getReferenceData(tipEl);
          template.innerHTML = `fjsdklfjdslkfjkdls ${new Date()}`;
          tip.loading = false;
          tip.update(this);
        }).catch(e => {
          // template.innerHTML = 'Loading failed';
          tip.loading = false;
        });
    },

    onHidden() {
      console.log('reverting html');
      // template.innerHTML = 'loading';
    },
    // prevent tooltip from displaying over button
    // popperOptions: {
    //   modifiers: {
    //     preventOverflow: {
    //       enabled: false
    //     },
    //     hide: {
    //       enabled: false
    //     }
    //   }
    // }
  });
}

const Reftagger = {
  initialized: false,
  settings: {
    onPageLoad: true,
    language: 'en',
    theme: 'light' // dark, light, transparent
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

    // Append the tooltip template to the body
    document.body.innerHTML += tooltipHTML;

    // Tag references on page load
    if (self.settings.onPageLoad) {
      window.onload = () => Reftagger.tag();
    }

    // Override the root object
    window.refTagger = self;

    self.initialized = true;
  },
  tag() {
    let html = document.body.innerText;
    const quranMatches = Quran.parse(html);
    quranMatches.forEach(match => {
      document.body.innerHTML = document.body.innerHTML.replace(match.replace, `<a href="#alkotob-tooltip" class="alkotob-ayah">${match.replace}</a>`);
    });

    createPopup();
  }
};

// Add https://atomiks.github.io/tippyjs/

Reftagger.init();

export default Reftagger;