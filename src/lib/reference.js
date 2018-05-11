class Reference {
  constructor() {
    // Set the index here to allow it to order in reverse.
    // When it breaks up the DOM indexes are reset unless reversed.
    this.order = 0;

    this._opts = {
      text: null,
      chapter: null,
      verses: null
    };
  }

  set text(val) {
    this._opts.text = val.trim();
  }

  set chapter(num) {
    this._opts.chapter = num.toString().trim();
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

  permalink(baseApiUrl, author) {
    let verseList = [];

    this.getNumbers(this.verses).forEach(verse => {
      verseList.push(this.chapter * 1000 + verse);
    });

    //console.log("permalink ", author, this.chapter, verseList.join());

    return baseApiUrl + '?author=' + author + '&verse_list=' + verseList.join();
  }

  getNumbers(stringNumbers) {
    //https://codereview.stackexchange.com/questions/26125/getting-all-number-from-a-string-like-this-1-2-5-9

    //if you had assignments, better if they are individually var'ed
    var nums = [];
    var entries = stringNumbers.split(',');
    var length = entries.length;

    //for variabes that don't, comma separated
    var i, entry, low, high, range;

    for (i = 0; i < length; i++) {
      entry = entries[i];

      //shortcut for testing a -1
      if (!~entry.indexOf('-')) {
        //absence of dash, must be a number
        //force to a number using +
        nums.push(+entry);
      } else {
        //presence of dash, must be range
        range = entry.split('-');

        //force to numbers
        low = +range[0];
        high = +range[1];

        //XOR swap, no need for an additional variable. still 3 steps though
        //http://en.wikipedia.org/wiki/XOR_swap_algorithm
        if(high < low){
          low = low ^ high;
          high = low ^ high;
          low = low ^ high;
        }

        //push for every number starting from low
        while (low <= high) {
          nums.push(low++);
        }
      }
    }

    //edit to sort list at the end
    return nums.sort(function (a, b) {
      return a - b;
    });
  }
}

export default Reference;
