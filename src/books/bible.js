import escape from 'escape-string-regexp';
import Reference from '../lib/reference';

function normalize(str) {
  return str.toLowerCase().trim();
}

let books = {
  'gen': ['Genesis', 'Gen', 'Ge', 'Gn'],
  'exo': ['Exodus', 'Exo', 'Ex', 'Exod'],
  'lev': ['Leviticus', 'Lev', 'Le', 'Lv'],
  'num': ['Numbers', 'Num', 'Nu', 'Nm', 'Nb'],
  'deu': ['Deuteronomy', 'Deut', 'Dt'],
  'jos': ['Joshua', 'Josh', 'Jos', 'Jsh'],
  'jdg': ['Judges', 'Judg', 'Jdg', 'Jg', 'Jdgs'],
  'rut': ['Ruth', 'Rth', 'Ru'],
  '1sa': ['1 Samuel', '1 Sam', '1 Sa', '1Samuel', '1S', '1 Sm', '1Sa', '1Sam', '1st Samuel', 'First Samuel'],
  '2sa': ['2 Samuel', '2 Sam', '2 Sa', '2S', '2 Sm', '2Sa', '2Sam', '2Samuel', '2nd Samuel', 'Second Samuel'],
  '1ki': ['1 Kings', '1 Kgs', '1 Ki', '1K', '1Kgs', '1Ki', '1Kings', '1st Kgs', '1st Kings', 'First Kings', 'First Kgs', '1Kin'],
  '2ki': ['2 Kings', '2 Kgs', '2 Ki', '2K', '2Kgs', '2Ki', '2Kings', '2nd Kgs', '2nd Kings', 'Second Kings', 'Second Kgs', '2Kin'],
  '1ch': ['1 Chronicles', '1 Chron', '1 Ch', '1Ch', '1 Chr', '1Chr', '1Chron', '1Chronicles', '1st Chronicles', 'First Chronicles'],
  '2ch': ['2 Chronicles', '2 Chron', '2 Ch', '2Ch', '2Chr', '2Chron', '2Chronicles', '2nd Chronicles', 'Second Chronicles'],
  'ezr': ['Ezra', 'Ezra', 'Ezr'],
  'neh': ['Nehemiah', 'Neh', 'Ne'],
  'est': ['Esther', 'Esth', 'Es'],
  'job': ['Job', 'Job', 'Job', 'Jb'],
  'psa': ['Psalm', 'Pslm', 'Ps', 'Psalms', 'Psa', 'Psm', 'Pss'],
  'pro': ['Proverbs', 'Prov', 'Pr', 'Prv'],
  'ecc': ['Ecclesiastes', 'Eccles', 'Ec', 'Ecc', 'Qoh', 'Qoheleth'],
  'sol': ['Song of Solomon', 'Song', 'So', 'Canticle of Canticles', 'Canticles', 'Song of Songs', 'SOS'],
  'isa': ['Isaiah', 'Isa', 'Is'],
  'jer': ['Jeremiah', 'Jer', 'Je', 'Jr'],
  'lam': ['Lamentations', 'Lam', 'La'],
  'eze': ['Ezekiel', 'Ezek', 'Eze', 'Ezk'],
  'dan': ['Daniel', 'Dan', 'Da', 'Dn'],
  'hos': ['Hosea', 'Hos', 'Ho'],
  'joe': ['Joel', 'Joel', 'Joe', 'Jl'],
  'amo': ['Amos', 'Amos', 'Am'],
  'oba': ['Obadiah', 'Obad', 'Ob'],
  'jon': ['Jonah', 'Jnh', 'Jon'],
  'mic': ['Micah', 'Micah', 'Mic'],
  'nah': ['Nahum', 'Nah', 'Na'],
  'hab': ['Habakkuk', 'Hab', 'Hab'],
  'zep': ['Zephaniah', 'Zeph', 'Zep', 'Zp'],
  'hag': ['Haggai', 'Haggai', 'Hag', 'Hg'],
  'zec': ['Zechariah', 'Zech', 'Zec', 'Zc'],
  'mal': ['Malachi', 'Mal', 'Mal', 'Ml'],
  'mat': ['Matthew', 'Matt', 'Mt'],
  'mar': ['Mark', 'Mrk', 'Mk', 'Mr'],
  'luk': ['Luke', 'Luk', 'Lk'],
  'joh': ['John', 'John', 'Jn', 'Jhn'],
  'act': ['Acts', 'Acts', 'Ac'],
  'rom': ['Romans', 'Rom', 'Ro', 'Rm'],
  '1co': ['1 Corinthians', '1 Cor', '1 Co', '1Co', '1Cor', '1Corinthians', '1st Corinthians', 'First Corinthians'],
  '2co': ['2 Corinthians', '2 Cor', '2 Co', '2Co', '2Cor', '2Corinthians', '2nd Corinthians', 'Second Corinthians'],
  'gal': ['Galatians', 'Gal', 'Ga'],
  'eph': ['Ephesians', 'Ephes', 'Eph'],
  'phi': ['Philippians', 'Phil', 'Php'],
  'col': ['Colossians', 'Col', 'Col'],
  '1th': ['1 Thessalonians', '1 Thess', '1 Th', '1Th', '1Thes', '1Thess', '1Thessalonians', '1st Thessalonians', 'First Thessalonians'],
  '2th': ['2 Thessalonians', '2 Thess', '2 Th', '2Th', '2Thes', '2Thess', '2Thessalonians', '2nd Thessalonians', 'Second Thessalonians'],
  '1ti': ['1 Timothy', '1 Tim', '1 Ti', '1Ti', '1Tim', '1Timothy', '1st Timothy', 'First Timothy'],
  '2ti': ['2 Timothy', '2 Tim', '2 Ti', '2Ti', '2Tim', '2Timothy', '2nd Timothy', 'Second Timothy'],
  'tit': ['Titus', 'Titus', 'Tit'],
  'phm': ['Philemon', 'Philem', 'Phm'],
  'heb': ['Hebrews', 'Hebrews', 'Heb'],
  'jam': ['James', 'James', 'Jas', 'Jm'],
  '1pe': ['1 Peter', '1 Pet', '1 Pe', '1Pe', '1Pet', '1 Pt', '1Pt', '1Peter', '1st Peter', 'First Peter'],
  '2pe': ['2 Peter', '2 Pet', '2 Pe', '2Pe', '2Pet', '2 Pt', '2Pt', '2Peter', '2nd Peter', 'Second Peter'],
  '1jo': ['1 John', '1 John', '1 Jn', '1Jn', '1Jo', '1Joh', '1 Jhn', '1Jhn', '1John', '1st John', 'First John'],
  '2jo': ['2 John', '2 John', '2 Jn', '2Jn', '2Jo', '2Joh', '2 Jhn', '2Jhn', '2John', '2nd John', 'Second John'],
  '3jo': ['3 John', '3 John', '3 Jn', '3Jn', '3Jo', '3Joh', '3 Jhn', '3Jhn', '3John', '3rd John', 'Third John'],
  'jud': ['Jude', 'Jude', 'Jud'],
  'rev': ['Revelation', 'Rev', 'Re', 'The Revelation']
};

// Make the array lowercase so its not case-sensitive
Object.keys(books).forEach(bookId => {
  books[bookId] = books[bookId].map(book => normalize(book));
});

function getBook(title) {
  title = normalize(title);

  // If they used an actual normalized version, return it
  if (typeof books[title] !== 'undefined') return title;

  // Look through titles for proper format
  for (let bookId of Object.keys(books)) {
    if (books[bookId].indexOf(title) !== -1) {
      return bookId;
    }
  }

  return false;
}

function parse(input) {
  let results = [];
  let pattern;
  let regex;
  let match;

  /**
   * <en|ar book> 10: 12-13,4
   * <en|ar book> 139: 12-13,4
   */
  let bookList = [];
  Object.keys(books).forEach(bookId => bookList.push(...books[bookId]));
  bookList = bookList.join('|');

  pattern = `(${bookList})\\s*`;
  pattern += '([\\d]{1,3})\\s*:?\\s*';
  pattern += '([\\d\\s\\-,]+)?';

  regex = new RegExp(pattern, 'gi');
  while (match = regex.exec(input)) {
    let ref = new Reference();

    ref.order = match.index;
    ref.text = match[0];
    ref.type = 'bible';
    ref.book = getBook(match[1]);
    ref.chapter = match[2];
    ref.verses = match[3];

    results.push(ref);
  }

  return results;
};

/**
 * Splitting the verses up for set parsing
 */
function splitVerses(verses) {
  return verses.split(',').map(set => set.match(/(\d+)/g, set));
}

/**
 * Function for building the query to send to GraphQL
 */
function queryBuilder(verses) {
  let versesQuery = '';
  splitVerses(verses).forEach(set => {
    const start = set[0];
    const end = set[1];

    // If there is an end verse limit needs to be set, otherwise
    // we will just use a limit: 1
    const limit = end ? `end: ${end}` : `limit: 1`;
    versesQuery += `
      verses${start}: verses(chapter: $chapter, start: ${start}, ${limit}) {
        chapter
        chapterName
        number
        text
      }
    `;
  });

  // Initialize the GraphQL query
  return `
    query ($code: String!, $chapter: Int, $book: String) {
      bible (code: $code) {
        name
        direction
        language
        books (code: $book) {
          name
          ${versesQuery}
        }
      }
    }
  `;
}

function renderVerses(verses, res) {
  const root = res.data.bible[0].books[0];
  const verseSets = splitVerses(verses);

  let html = '';
  verseSets.forEach((set, idx) => {
    const start = set[0];
    root[`verses${start}`].forEach(verse => {
      html += `<span class="verse">${verse.text} <sup>${verse.number}</sup></span> `;
    });

    if (idx < verseSets.length - 1) html += ' &hellip; ';
  });

  return html;
}

export default { parse, getBook, queryBuilder, renderVerses };
export { getBook, parse, queryBuilder, renderVerses };