export default class BookBase {

  /**
   * Function for rendering response for a book
   */
  static render(res) {
    let html       = '';
    let length     = 0;
    const truncate = 400;

    if (!res) return null;

    Object.keys(res).forEach(key => {
      if (/^verses/.test(key)) {
        res[key].forEach(verse => {
          if (length <= truncate) {
            let text = verse.text;
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

            html += `<span class="verse"><sup>${verse.number}</sup> ${text}</span> `;
          }
        });
      }
    });

    return html;
  }

  /**
   * This will check the current book type for a supporting chapter or book
   */
  getVersion(key, desired = []) {
    if (! this.translations) throw 'Please implement translations.';

    // Quran needs to go back a chapter because index starts at 0
    if (! isNaN(parseInt(key, 10))) {
      key = parseInt(key, 10) - 1;
    }

    // Get supported translations
    const supported = this.translations.map(t => t.abbreviation);

    for (let translation of desired) {

      // This is one of the desired translations, lets see if it works
      let idx;
      if ((idx = supported.indexOf(translation)) !== -1) {
        const accepted = this.translations[idx];

        // Return if this translation has this chapter
        if (accepted.chapters && accepted.chapters[key]) {
          return accepted.abbreviation;
        }

        // Return if this translation has this book
        if (accepted.books && accepted.books[key]) {
          return accepted.abbreviation;
        }
      }
    }

    return null;
  }
}
