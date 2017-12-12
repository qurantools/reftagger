import escape from 'escape-string-regexp';
import Reference from '../lib/reference';
import BookBase from './base';

// Import translation configurations
import tma from './bible/tma';
import injil from './bible/injil';

const BOOK_REFS = {
  'gen': ['genesis', 'gen', 'ge', 'gn'],
  'exo': ['exodus', 'exo', 'ex', 'exod'],
  'lev': ['leviticus', 'lev', 'le', 'lv'],
  'num': ['numbers', 'num', 'nu', 'nm', 'nb'],
  'deu': ['deuteronomy', 'deut', 'dt'],
  'jos': ['joshua', 'josh', 'jos', 'jsh'],
  'jdg': ['judges', 'judg', 'jdg', 'jg', 'jdgs'],
  'rut': ['ruth', 'rth', 'ru'],
  '1sa': ['1 samuel', '1 sam', '1 sa', '1samuel', '1s', '1 sm', '1sa', '1sam', '1st samuel', 'first samuel'],
  '2sa': ['2 samuel', '2 sam', '2 sa', '2s', '2 sm', '2sa', '2sam', '2samuel', '2nd samuel', 'second samuel'],
  '1ki': ['1 kings', '1 kgs', '1 ki', '1k', '1kgs', '1ki', '1kings', '1st kgs', '1st kings', 'first kings', 'first kgs', '1kin'],
  '2ki': ['2 kings', '2 kgs', '2 ki', '2k', '2kgs', '2ki', '2kings', '2nd kgs', '2nd kings', 'second kings', 'second kgs', '2kin'],
  '1ch': ['1 chronicles', '1 chron', '1 ch', '1ch', '1 chr', '1chr', '1chron', '1chronicles', '1st chronicles', 'first chronicles'],
  '2ch': ['2 chronicles', '2 chron', '2 ch', '2ch', '2chr', '2chron', '2chronicles', '2nd chronicles', 'second chronicles'],
  'ezr': ['ezra', 'ezra', 'ezr'],
  'neh': ['nehemiah', 'neh', 'ne'],
  'est': ['esther', 'esth', 'es'],
  'job': ['job', 'job', 'job', 'jb'],
  'psa': ['psalm', 'pslm', 'ps', 'psalms', 'psa', 'psm', 'pss'],
  'pro': ['proverbs', 'prov', 'pr', 'prv'],
  'ecc': ['ecclesiastes', 'eccles', 'ec', 'ecc', 'qoh', 'qoheleth'],
  'sol': ['song of solomon', 'song', 'so', 'canticle of canticles', 'canticles', 'song of songs', 'sos'],
  'isa': ['isaiah', 'isa', 'is'],
  'jer': ['jeremiah', 'jer', 'je', 'jr'],
  'lam': ['lamentations', 'lam', 'la'],
  'eze': ['ezekiel', 'ezek', 'eze', 'ezk'],
  'dan': ['daniel', 'dan', 'da', 'dn'],
  'hos': ['hosea', 'hos', 'ho'],
  'joe': ['joel', 'joel', 'joe', 'jl'],
  'amo': ['amos', 'amos', 'am'],
  'oba': ['obadiah', 'obad', 'ob'],
  'jon': ['jonah', 'jnh', 'jon'],
  'mic': ['micah', 'micah', 'mic'],
  'nah': ['nahum', 'nah', 'na'],
  'hab': ['habakkuk', 'hab', 'hab'],
  'zep': ['zephaniah', 'zeph', 'zep', 'zp'],
  'hag': ['haggai', 'haggai', 'hag', 'hg'],
  'zec': ['zechariah', 'zech', 'zec', 'zc'],
  'mal': ['malachi', 'mal', 'mal', 'ml'],
  'mat': ['matthew', 'matt', 'mt'],
  'mar': ['mark', 'mrk', 'mk', 'mr'],
  'luk': ['luke', 'luk', 'lk'],
  'joh': ['john', 'john', 'jn', 'jhn'],
  'act': ['acts', 'acts', 'ac'],
  'rom': ['romans', 'rom', 'ro', 'rm'],
  '1co': ['1 corinthians', '1 cor', '1 co', '1co', '1cor', '1corinthians', '1st corinthians', 'first corinthians'],
  '2co': ['2 corinthians', '2 cor', '2 co', '2co', '2cor', '2corinthians', '2nd corinthians', 'second corinthians'],
  'gal': ['galatians', 'gal', 'ga'],
  'eph': ['ephesians', 'ephes', 'eph'],
  'phi': ['philippians', 'phil', 'php'],
  'col': ['colossians', 'col', 'col'],
  '1th': ['1 thessalonians', '1 thess', '1 th', '1th', '1thes', '1thess', '1thessalonians', '1st thessalonians', 'first thessalonians'],
  '2th': ['2 thessalonians', '2 thess', '2 th', '2th', '2thes', '2thess', '2thessalonians', '2nd thessalonians', 'second thessalonians'],
  '1ti': ['1 timothy', '1 tim', '1 ti', '1ti', '1tim', '1timothy', '1st timothy', 'first timothy'],
  '2ti': ['2 timothy', '2 tim', '2 ti', '2ti', '2tim', '2timothy', '2nd timothy', 'second timothy'],
  'tit': ['titus', 'titus', 'tit'],
  'phm': ['philemon', 'philem', 'phm'],
  'heb': ['hebrews', 'hebrews', 'heb'],
  'jam': ['james', 'james', 'jas', 'jm'],
  '1pe': ['1 peter', '1 pet', '1 pe', '1pe', '1pet', '1 pt', '1pt', '1peter', '1st peter', 'first peter'],
  '2pe': ['2 peter', '2 pet', '2 pe', '2pe', '2pet', '2 pt', '2pt', '2peter', '2nd peter', 'second peter'],
  '1jo': ['1 john', '1 john', '1 jn', '1jn', '1jo', '1joh', '1 jhn', '1jhn', '1john', '1st john', 'first john'],
  '2jo': ['2 john', '2 john', '2 jn', '2jn', '2jo', '2joh', '2 jhn', '2jhn', '2john', '2nd john', 'second john'],
  '3jo': ['3 john', '3 john', '3 jn', '3jn', '3jo', '3joh', '3 jhn', '3jhn', '3john', '3rd john', 'third john'],
  'jud': ['jude', 'jude', 'jud'],
  'rev': ['revelation', 'rev', 're', 'the revelation']
};

export default class Bible extends BookBase {
  constructor() {
    super();

    const self = this;

    // Translations available
    self.translations = [injil, tma];

    // Masterlist of books and titles
    self.books = BOOK_REFS;

    // Append translation configurations to masterlist
    self.translations.forEach(translation => {
      Object.keys(translation.books).forEach((bookId) => {
        self.books[bookId].push(...translation.books[bookId]);
      });
    });

    // Create a regex once for use later when tagging
    let bookList = Object.keys(self.books).map(k => self.books[k]);
    self.booksRegexp = Array.prototype.concat(...bookList)
      .map(e => escape(e))
      .join('|');

    // Get the masterlist codes to use for associations
    self.bookCodes = Object.keys(self.books);
  }

  /**
   * Loading a book key from the references
   */
  getBook(reference) {
    const self = this;

    reference = self._normalize(reference);

    // If they used an actual normalized version, return it
    if (self.bookCodes.indexOf(reference) !== -1) return reference;

    // Look through references to get associated code
    for (let bookId of self.bookCodes) {
      if (self.books[bookId].indexOf(reference) !== -1) {
        return bookId;
      }
    }

    return null;
  }

  parse(input) {
    const self    = this;
    const results = [];
    let match;

    /**
     * <en|ar book> 10: 12-13,4
     * <en|ar book> 139: 12-13,4
     */
    let pattern = `(${self.booksRegexp})\\s*`;
    pattern += '([\\d]{1,3})\\s*:?\\s*';
    pattern += '([\\d\\s\\-,]+)?';

    let regex = new RegExp(pattern, 'gi');
    while (match = regex.exec(input)) {
      let ref = new Reference();

      ref.order   = match.index;
      ref.text    = match[0];
      ref.type    = 'bible';
      ref.book    = self.getBook(match[1]);
      ref.chapter = match[2];
      ref.verses  = match[3];

      results.push(ref);
    }

    return results;
  }

  _normalize(str) {
    return str.toLowerCase().trim();
  }
}
