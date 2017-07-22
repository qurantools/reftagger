import Tippy from 'tippy.js';
import Quran from './books/quran';
import Bible from './books/bible';
import tooltipHTML from './templates/tooltip';

function initTooltips() {
  // Append the tooltip template to the body
  document.body.innerHTML += tooltipHTML;

  const template = document.getElementById('alkotob-tooltip');
  const tippy = Reftagger.tippy = Tippy('.alkotob-ayah', {
    arrow: true,
    html: '#alkotob-tooltip',
    interactive: true,
    theme: Reftagger.settings.theme,
    flipDuration: 0, // prevent a transition once tooltip size changes and updates position
    onShow() {
      if (tippy.loading) return;
      tippy.loading = true;

      const el = tippy.getReferenceElement(this);
      const matchText = el.getAttribute('data-text');
      const bookType = el.getAttribute('data-type');
      const book = el.getAttribute('data-book');
      const chapter = el.getAttribute('data-chapter');
      const verses = el.getAttribute('data-verses');

      // Update the reference in the tooltip
      const reference = document.getElementById('alkotob-reference');
      reference.innerHTML = matchText.trim();

      tippy.update(this);

      // TODO: load the api request
      // fetch('https://unsplash.it/200/?random')
      //   .then(resp => resp.blob())
      //   .then(blob => {
      //     const refData = tippy.getReferenceData(el);
      //     template.innerHTML = `fjsdklfjdslkfjkdls ${new Date()}`;
      //     tippy.loading = false;
      //     tippy.update(this);
      //   }).catch(e => {
      //     // template.innerHTML = 'Loading failed';
      //     tippy.loading = false;
      //   });
    },

    onHide() {
      tippy.loading = false;
    },

    onHidden() {
      // template.innerHTML = 'loading';
    }
  });
}

const Reftagger = {
  initialized: false,

  // Reference to the tippy.js object
  tippy: null,

  settings: {
    onPageLoad: true,
    language: 'en',
    theme: 'light' // dark, light, transparent
  },

  /**
   * Initializes the refTagger object and appends proper elements
   * to DOM and styles to DOM as well.
   */
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

  /**
   * This is the primary init function that runs regex on the HTML to find
   * references. If a context is provided it will execute only within the
   * context, otherwise it will execute on the document body. If no context
   * is provided it will attempt to destroy previous matches so it doesn't
   * double insert.
   *
   * @param ctx Actual DOM context to perform updates
   */
  tag(ctx) {
    let context = ctx || document.body;
    let html = context.innerText;
    let queue = [];

    queue.push(...Quran.parse(html));

    queue.forEach(match => {
      const html = `<a href="#"
        class="alkotob-ayah"
        data-text="${match.replace}"
        data-type="${match.type}"
        data-book="${match.book || ''}"
        data-chapter="${match.chapter}"
        data-verses="${match.verses}">
          ${match.replace}
        </a>`;

      // Replace each match with proper html
      context.innerHTML = context.innerHTML.replace(match.replace, html);
    });

    initTooltips();
  },

  /**
   * Destroys all the references that have been made on the page.
   */
  destroy() {
    const references = document.querySelectorAll('.alkotob-ayah');

    // Replace them with the original text
    for (let i = 0; i < references.length; i++) {
      references[i].outerHTML = references[i].innerHTML;
    }
  }
};

// Initialize on script load
Reftagger.init();

export default Reftagger;