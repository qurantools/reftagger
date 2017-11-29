class Reference {
  constructor() {
    // Set the index here to allow it to order in reverse.
    // When it breaks up the DOM indexes are reset unless reversed.
    this.order = 0;

    this._opts = {
      text: null,
      type: null,
      book: null,
      chapter: null,
      verses: null
    };
  }

  set text(val) {
    this._opts.text = val.trim();
  }

  set type(type) {
    if (['quran', 'bible'].indexOf(type) === -1) {
      throw 'You must specify a proper book type';
    }

    this._opts.type = type;
  }

  set chapter(num) {
    this._opts.chapter = num.toString().trim();
  }

  set book(name) {
    this._opts.book = name.trim();
  }

  set verses(str) {
    if (typeof str === 'undefined') return;
    this._opts.verses = str.toString().replace(/\s/g, '');
  }

  get options() {
    return this._opts;
  }

  get text() {
    return this._opts.text;
  }

  get type() {
    return this._opts.type;
  }

  get book() {
    return this._opts.book;
  }

  get chapter() {
    return this._opts.chapter;
  }

  get verses() {
    return this._opts.verses;
  }

  /**
   * Creates an array of verses and beginning end sets (start and end index)
   * Example: [[1, 3], [6]]
   */
  static parseVerses(verseStr) {
    return verseStr
      .replace(/\s/g, '')
      .replace(/[^\-\d,]/g, '')
      .split(',')
      .filter(set => !!set)
      .map(set => set.match(/(\d+)/g, set));
  }

  permalink(version) {
    return [
      'https://alkotob.org',
      version,
      [this.book, this.chapter, this.verses].filter(item => !! item).join('.'),
    ].join('/') + '?ref=reftagger';
  }
}

export default Reference;
