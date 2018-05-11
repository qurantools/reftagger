import Reference from '../lib/reference';

export default class BookBase {

  /**
   * Function for building the query
   */
  static queryBuilder(type, verses) {
    let versesQuery = '';

    return quranQuery;
  }

  /**
   * Function for rendering response for a book
   */
  static render(verses) {
    let html       = '';
    let length     = 0;
    const truncate = 400;

    if (!verses) return null;

    verses.forEach(verse => {
        if (length <= truncate) {
          let text = verse.content;
          const beforeLength = length;
          length += text.length;

          // Need to truncate this verse
          if (length > truncate) {
            const cut = truncate - beforeLength;
            text = verse.text.substr(0, cut);

            // Trim if mid-word, need to complete the word
            text = verse.text.substr(0, Math.min(text.length, text.lastIndexOf(' ')));
            text += ' &hellip;';
          }

          html += `<span class="verse"><sup>${verse.chapter}:${verse.verse}</sup> ${text}</span><br>`;
        }
    });

    return html;
  }

  /**
   * Normalizes text for the searching of books and chapters
   */
  _normalize(str) {
    return str.toLowerCase().trim().replace(/\s+/, ' ');
  }
}
