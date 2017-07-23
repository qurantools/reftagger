import escape from 'escape-string-regexp';
import Reference from '../lib/reference';

let books = {
  psa: ['Ps', 'Psalms', 'Psalm']
};

// Make the array lowercase so its not case-sensitive
Object.keys(books).forEach(bookId => {
  books[bookId] = books[bookId].map(book => book.toLowerCase());
});

function getBook(title) {
  title = title.toLowerCase();

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

  pattern = `
    (${bookList})
    \\s*
      ([\\d]{1,3})\\s*:?
      \\s*
      ([\\d\\s\\-,]+)?
    `;

  regex = new RegExp(pattern.replace(/[\n\s]+/g, ''), 'gi');
  while (match = regex.exec(input)) {
    let ref = new Reference();

    ref.text = match[0];
    ref.type = 'bible';
    ref.book = getBook(match[1]);
    ref.chapter = match[2];
    ref.verses = match[3];

    results.push(ref);
  }

  return results;
};

export default { parse, getBook };
export { getBook, parse };