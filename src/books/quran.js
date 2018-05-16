import escape from 'escape-string-regexp';
import Reference from '../lib/reference';
import BookBase from './base';

// Import translation configurations
import original from './quran/quran';
import qeng63 from './quran/qeng63';
import qind68 from './quran/qind68';
import qind90 from './quran/qind90';

const CHAPTER_REFS = [
  ["al-fatihah", "the opener"],
  ["al-baqarah", "the cow"],
  ["ali 'imran", "family of imran"],
  ["an-nisa", "the women"],
  ["al-ma'idah", "the table spread"],
  ["al-an'am", "the cattle"],
  ["al-a'raf", "the heights"],
  ["al-anfal", "the spoils of war"],
  ["at-tawbah", "the repentance"],
  ["yunus", "jonah"],
  ["hud", "hud"],
  ["yusuf", "joseph"],
  ["ar-ra'd", "the thunder"],
  ["ibrahim", "abrahim"],
  ["al-hijr", "the rocky tract"],
  ["an-nahl", "the bee"],
  ["al-isra", "the night journey"],
  ["al-kahf", "the cave"],
  ["maryam", "mary"],
  ["taha", "ta-ha"],
  ["al-anbya", "the prophets"],
  ["al-haj", "the pilgrimage"],
  ["al-mu'minun", "the believers"],
  ["an-nur", "the light"],
  ["al-furqan", "the criterian"],
  ["ash-shu'ara", "the poets"],
  ["an-naml", "the ant"],
  ["al-qasas", "the stories"],
  ["al-'ankabut", "the spider"],
  ["ar-rum", "the romans"],
  ["luqman", "luqman"],
  ["as-sajdah", "the prostration"],
  ["al-ahzab", "the combined forces"],
  ["saba", "sheba"],
  ["fatir", "originator"],
  ["ya-sin", "ya sin"],
  ["as-saffat", "those who set the ranks"],
  ["sad", "the letter \"saad\""],
  ["az-zumar", "the troops"],
  ["ghafir", "the forgiver"],
  ["fussilat", "explained in detail"],
  ["ash-shuraa", "the consultation"],
  ["az-zukhruf", "the ornaments of gold"],
  ["ad-dukhan", "the smoke"],
  ["al-jathiyah", "the crouching"],
  ["al-ahqaf", "the wind-curved sandhills"],
  ["muhammad", "muhammad"],
  ["al-fath", "the victory"],
  ["al-hujurat", "the rooms"],
  ["qaf", "the letter \"qaf\""],
  ["adh-dhariyat", "the winnowing winds"],
  ["at-tur", "the mount"],
  ["an-najm", "the star"],
  ["al-qamar", "the moon"],
  ["ar-rahman", "the beneficent"],
  ["al-waqi'ah", "the inevitable"],
  ["al-hadid", "the iron"],
  ["al-mujadila", "the pleading woman"],
  ["al-hashr", "the exile"],
  ["al-mumtahanah", "she that is to be examined"],
  ["as-saf", "the ranks"],
  ["al-jumu'ah", "the congregation, friday"],
  ["al-munafiqun", "the hypocrites"],
  ["at-taghabun", "the mutual disillusion"],
  ["at-talaq", "the divorce"],
  ["at-tahrim", "the prohibtiion"],
  ["al-mulk", "the sovereignty"],
  ["al-qalam", "the pen"],
  ["al-haqqah", "the reality"],
  ["al-ma'arij", "the ascending stairways"],
  ["nuh", "noah"],
  ["al-jinn", "the jinn"],
  ["al-muzzammil", "the enshrouded one"],
  ["al-muddaththir", "the cloaked one"],
  ["al-qiyamah", "the resurrection"],
  ["al-insan", "the man"],
  ["al-mursalat", "the emissaries"],
  ["an-naba", "the tidings"],
  ["an-nazi'at", "those who drag forth"],
  ["'abasa", "he frowned"],
  ["at-takwir", "the overthrowing"],
  ["al-infitar", "the cleaving"],
  ["al-mutaffifin", "the defrauding"],
  ["al-inshiqaq", "the sundering"],
  ["al-buruj", "the mansions of the stars"],
  ["at-tariq", "the nightcommer"],
  ["al-a'la", "the most high"],
  ["al-ghashiyah", "the overwhelming"],
  ["al-fajr", "the dawn"],
  ["al-balad", "the city"],
  ["ash-shams", "the sun"],
  ["al-layl", "the night"],
  ["ad-duhaa", "the morning hours"],
  ["ash-sharh", "the relief"],
  ["at-tin", "the fig"],
  ["al-'alaq", "the clot"],
  ["al-qadr", "the power"],
  ["al-bayyinah", "the clear proof"],
  ["az-zalzalah", "the earthquake"],
  ["al-'adiyat", "the courser"],
  ["al-qari'ah", "the calamity"],
  ["at-takathur", "the rivalry in world increase"],
  ["al-'asr", "the declining day"],
  ["al-humazah", "the traducer"],
  ["al-fil", "the elephant"],
  ["quraysh", "quraysh"],
  ["al-ma'un", "the small kindesses"],
  ["al-kawthar", "the abundance"],
  ["al-kafirun", "the disbelievers"],
  ["an-nasr", "the divine support"],
  ["al-masad", "the palm fiber"],
  ["al-ikhlas", "the sincerity"],
  ["al-falaq", "the daybreak"],
  ["an-nas", "the mankind"],
];

export default class Quran extends BookBase {
  constructor() {
    super();

    const self = this;

    // Translations available
    self.translations = [original, qeng63, qind68, qind90];

    // Masterlist of chapters and titles
    self.chapters = CHAPTER_REFS;

    // Append translation configurations to masterlist
    self.translations.forEach(translation => {
      translation.chapters.forEach((names, idx) => {
        self.chapters[idx].push(...translation.chapters[idx]);
      });
    });
    //console.log("chapters",self.chapters)

    // Create a regex once for use later when tagging
    self.chaptersRegexp = Array.prototype.concat(...self.chapters)
      .map(e => escape(e))
      .join('|');

    //console.log("chaptersRegexp",self.chaptersRegexp)

    // Get the masterlist codes to use for associations
    self.chapterIds = Object.keys(self.chapters);
  }

  /**
   * Loading a book key from the references
   */
  getChapter(reference) {
    const self = this;

    let c = parseInt(reference);
    reference = self._normalize(reference);

    // Chapter is already a number
    if (!isNaN(c)) return c;
    else c--;

    let chapterIdx;

    // Attempt to find it in the array
    self.chapters.forEach((b, idx) => {
      if (b.indexOf(reference) !== -1) {
        // Do +1 as array starts at zero
        chapterIdx = idx + 1;
        return;
      }
    });

    return chapterIdx;
  }

  parse(input) {
    const self    = this;
    const results = [];
    let pattern;
    let match;
    let regex;

    /**
     * Kur'an 2:123
     * Kur'an 2:123,124
     * Kur'an 2:123-127
     * Kur'an 2:123,125-127
     * Similar usage as Kur'an (above) for Quran, Qur'an, Koran, and Kuran
     * Chapter:(Verse|Verse_Group) -> 2:3 or 2:3,4 or 2:3-5,7 ...
     */
    pattern = '(?:quran|kuran|koran|qur\\\'an|kur\\\'an)\\s+';
    pattern += '([\\d]{1,3})';
    pattern += '(?::\\s*([\\d\\s\\-,]+))?';

    regex = new RegExp(pattern, 'gi');
    while (match = regex.exec(input)) {
      let ref = new Reference();

      ref.order   = match.index;
      ref.text    = match[0];
      ref.chapter = self.getChapter(match[1]);
      ref.verses  = match[2];
      //console.log("REF first ",ref)
      results.push(ref);
    }

    /***
     * Bakara 123
     * Bakara 123,124
     * Bakara 123-127
     * Bakara 123,125-127
     * Surat Bakara 123,125-127
     * Bakara Suresi 7. Ayet  //"Suresi" and ".Ayet" is optional
     * Bakara Suresi 2-7
     * Bakara 4,5-7
     */
     pattern = '(?:surat|سورة)?\\s*';
     pattern += `(${self.chaptersRegexp}):?\\s*(?: Suresi(?=[ -:]))?`;
     pattern += '(?:([\\d]{1,3})\\s*:)?\\s+';
     pattern += '([\\d\\s\\-,]+)(:?\\. Ayet)?';
     regex = new RegExp(pattern, 'gi');
     while (match = regex.exec(input)) {
     let ref = new Reference();

     ref.order   = match.index;
     ref.text    = match[0];
     ref.chapter = self.getChapter(match[2] || match[1]);
     ref.verses  = match[3];
     //console.log("REF second ",ref)
     results.push(ref);
     }


    return results;
  }
}
