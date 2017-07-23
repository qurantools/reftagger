import Tippy from 'tippy.js';
import Quran from './books/quran';
import Bible from './books/bible';
import tooltipHTML from './templates/tooltip';
import DOMIterator from './lib/dom-iterator';

/**
 * The main entry point for the reftagger of Alkotob
 */
class Reftagger {
  constructor(ctx) {
    this._initialized = false;
    this._tippy = null;
    this._iterator;
    this._ctx = ctx;

    // Initialize the default settings for the class
    this._settings = {
      onPageLoad: true,
      iframes: true, // From match.js
      exclude: [], // From match.js
      theme: 'light', // dark, light, transparent, <custom>
    };
  }

  /**
   * Utility function for accessing the settings
   */
  get settings() {
    return this._settings;
  }

  /**
   * An instance of DOMIterator
   * @type {DOMIterator}
   * @access protected
   */
  get iterator() {
    return new DOMIterator(
      this._ctx || document,
      this.settings.iframes,
      this.settings.exclude
    );
  }

  /**
   * Initializes the functionality on the page, called within the library
   * for initial page load and looks for the settings variable on the page.
   */
  init() {
    const self = this;
    if (this._initialized) return;

    // Start working on the options
    let options = typeof window.refTagger !== 'undefined' ? window.refTagger : {};

    // Update the settings with user defined values
    Object.keys(options).forEach(key => {
      if (typeof self._settings[key] !== 'undefined') {
        self._settings[key] = options[key];
      }
    });

    // Override the root object
    window.refTagger = self;

    self._initDOMDependencies();

    // Tag references on page load
    if (self.settings.onPageLoad) {
      window.onload = () => self.tag();
    }

    self._initialized = true;
  }

  /**
   * This is the primary init function that runs regex on the HTML to find
   * references. If a context is provided it will execute only within the
   * context, otherwise it will execute on the document body. If no context
   * is provided it will attempt to destroy previous matches so it doesn't
   * double insert.
   *
   * @param ctx Actual DOM context to perform updates
   */
  tag(ctx) { // TODO: implement DOM for ctx
    let nodes = this._getTextNodes();

    nodes.forEach(node => {
      let references = [];

      // Parse out all the references
      references.push(...Quran.parse(node.textContent));

      references
        .reverse() // Reverse the DOM manipulation cause it splits nodes
        .forEach(ref => this._wrapReference(node, ref));
    });

    this._initTooltips();
  }

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

  /**
   * Adds necessary elements to DOM
   */
  _initDOMDependencies() {
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.setAttribute('href', 'https://unpkg.com/tippy.js@1.1.3/dist/tippy.css'); // TODO: use own stylesheet
    document.getElementsByTagName('head')[0].appendChild(style);

    // Append the tooltip template to the body
    document.body.innerHTML += tooltipHTML;
  }

  /**
   * Retrieves the text nodes that will contain references
   */
  _getTextNodes() {
    let nodes = [];

    this.iterator.forEachNode(NodeFilter.SHOW_TEXT, node => {
      nodes.push(node);
    }, node => {
      if (this._matchesExclude(node.parentNode)) {
        return NodeFilter.FILTER_REJECT;
      } else {
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    return nodes;
  }

  /**
   * Wraps the instance element and class around matches that fit the start
   * and end positions within the node
   * @param  {HTMLElement} node - The DOM text node
   * @return {Reference} Reference to replace it with
   */
  _wrapReference(node, ref) {
    const startIdx = node.textContent.indexOf(ref.text);
    if (startIdx === -1) return;

    const startNode = node.splitText(startIdx);

    let refEl = document.createElement('a');
    refEl.setAttribute('href', '#');
    refEl.setAttribute('class', 'alkotob-ayah');
    refEl.setAttribute('data-text', ref.text);
    refEl.setAttribute('data-type', ref.type);
    refEl.setAttribute('data-book', ref.book);
    refEl.setAttribute('data-chapter', ref.chapter);
    refEl.setAttribute('data-verses', ref.verses);
    refEl.textContent = ref.text;

    // Get rid of actual text in following node
    startNode.textContent = startNode.textContent.replace(ref.text, '');

    // Insert it before the tailing statement
    startNode.parentNode.insertBefore(refEl, startNode);
  }

  /**
   * Checks if an element matches any of the specified exclude selectors. Also
   * it checks for elements in which no marks should be performed (e.g.
   * script and style tags) and optionally already marked elements
   * @param  {HTMLElement} el - The element to check
   * @return {boolean}
   * @access protected
   */
  _matchesExclude(el) {
    return DOMIterator.matches(el, this.settings.exclude.concat([
      // ignores the elements itself, not their childrens (selector *)
      "script", "style", "title", "head", "html"
    ]));
  }

  /**
   * Inits tooltips across the site by looping through text elements and
   * replacing it with reference tips.
   */
  _initTooltips() {
    const self = this;

    // Setup references to update elements
    const template = document.getElementById('alkotob-tooltip');
    const reference = document.getElementById('alkotob-reference');

    self._tippy = Tippy('.alkotob-ayah', {
      arrow: true,
      html: '#alkotob-tooltip',
      interactive: true,
      theme: self.settings.theme,
      flipDuration: 0, // prevent a transition once tooltip size changes and updates position
      onShow() {
        if (self._tippy.loading) return;
        self._tippy.loading = true;

        const el = self._tippy.getReferenceElement(this);
        const matchText = el.getAttribute('data-text');
        const bookType = el.getAttribute('data-type');
        const book = el.getAttribute('data-book');
        const chapter = el.getAttribute('data-chapter');
        const verses = el.getAttribute('data-verses');

        // Update the reference in the tooltip
        reference.innerHTML = matchText.trim();

        self._tippy.update(this);

        // TODO: load the api request
        // fetch('https://unsplash.it/200/?random')
        //   .then(resp => resp.blob())
        //   .then(blob => {
        //     const refData = self._tippy.getReferenceData(el);
        //     template.innerHTML = `fjsdklfjdslkfjkdls ${new Date()}`;
        //     self._tippy.loading = false;
        //     self._tippy.update(this);
        //   }).catch(e => {
        //     // template.innerHTML = 'Loading failed';
        //     self._tippy.loading = false;
        //   });
      },

      onHide() {
        self._tippy.loading = false;
      },

      onHidden() {
        // template.innerHTML = 'loading';
      }
    });
  }
}

// Initialize on script load
const tagger = new Reftagger();
tagger.init();

export default Reftagger;