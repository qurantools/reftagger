import escape from 'escape-string-regexp';

let chapters = [
  ["Al-Fatihah", "The Opener", "الفاتحة"],
  ["Al-Baqarah", "The Cow", "البقرة"],
  ["Ali 'Imran", "Family of Imran", "آل عمران"],
  ["An-Nisa", "The Women", "النساء"],
  ["Al-Ma'idah", "The Table Spread", "المائدة"],
  ["Al-An'am", "The Cattle", "الأنعام"],
  ["Al-A'raf", "The Heights", "الأعراف"],
  ["Al-Anfal", "The Spoils of War", "الأنفال"],
  ["At-Tawbah", "The Repentance", "التوبة"],
  ["Yunus", "Jonah", "يونس"],
  ["Hud", "Hud", "هود"],
  ["Yusuf", "Joseph", "يوسف"],
  ["Ar-Ra'd", "The Thunder", "الرّعد"],
  ["Ibrahim", "Abrahim", "إبراهيم"],
  ["Al-Hijr", "The Rocky Tract", "الحجر"],
  ["An-Nahl", "The Bee", "النحل"],
  ["Al-Isra", "The Night Journey", "الإسراء"],
  ["Al-Kahf", "The Cave", "الكهف"],
  ["Maryam", "Mary", "مريم"],
  ["Taha", "Ta-Ha", "طه"],
  ["Al-Anbya", "The Prophets", "الأنبياء"],
  ["Al-Haj", "The Pilgrimage", "الحج"],
  ["Al-Mu'minun", "The Believers", "المؤمنون"],
  ["An-Nur", "The Light", "النّور"],
  ["Al-Furqan", "The Criterian", "الفرقان"],
  ["Ash-Shu'ara", "The Poets", "الشعراء"],
  ["An-Naml", "The Ant", "النمل"],
  ["Al-Qasas", "The Stories", "القصص"],
  ["Al-'Ankabut", "The Spider", "العنكبوت"],
  ["Ar-Rum", "The Romans", "الروم"],
  ["Luqman", "Luqman", "لقمان"],
  ["As-Sajdah", "The Prostration", "السجدة"],
  ["Al-Ahzab", "The Combined Forces", "الأحزاب"],
  ["Saba", "Sheba", "سبإ"],
  ["Fatir", "Originator", "فاطر"],
  ["Ya-Sin", "Ya Sin", "يس"],
  ["As-Saffat", "Those who set the Ranks", "الصّافّات"],
  ["Sad", "The Letter \"Saad\"", "ص"],
  ["Az-Zumar", "The Troops", "الزمر"],
  ["Ghafir", "The Forgiver", "غافر"],
  ["Fussilat", "Explained in Detail", "فصّلت"],
  ["Ash-Shuraa", "The Consultation", "الشورى"],
  ["Az-Zukhruf", "The Ornaments of Gold", "الزخرف"],
  ["Ad-Dukhan", "The Smoke", "الدخان"],
  ["Al-Jathiyah", "The Crouching", "الجاثية"],
  ["Al-Ahqaf", "The Wind-Curved Sandhills", "الأحقاف"],
  ["Muhammad", "Muhammad", "محمّـد"],
  ["Al-Fath", "The Victory", "الفتح"],
  ["Al-Hujurat", "The Rooms", "الحُـجُـرات"],
  ["Qaf", "The Letter \"Qaf\"", "ق"],
  ["Adh-Dhariyat", "The Winnowing Winds", "الذاريات"],
  ["At-Tur", "The Mount", "الـطور"],
  ["An-Najm", "The Star", "الـنحـم"],
  ["Al-Qamar", "The Moon", "الـقمـر"],
  ["Ar-Rahman", "The Beneficent", "الـرحـمـن"],
  ["Al-Waqi'ah", "The Inevitable", "الواقيـة"],
  ["Al-Hadid", "The Iron", "الحـديد"],
  ["Al-Mujadila", "The Pleading Woman", "الـمجادلـة"],
  ["Al-Hashr", "The Exile", "الـحـشـر"],
  ["Al-Mumtahanah", "She that is to be examined", "الـمـمـتـحنة"],
  ["As-Saf", "The Ranks", "الـصّـف"],
  ["Al-Jumu'ah", "The Congregation, Friday", "الـجـمـعـة"],
  ["Al-Munafiqun", "The Hypocrites", "الـمنافقون"],
  ["At-Taghabun", "The Mutual Disillusion", "الـتغابن"],
  ["At-Talaq", "The Divorce", "الـطلاق"],
  ["At-Tahrim", "The Prohibtiion", "الـتحريم"],
  ["Al-Mulk", "The Sovereignty", "الـملك"],
  ["Al-Qalam", "The Pen", "الـقـلـم"],
  ["Al-Haqqah", "The Reality", "الـحاقّـة"],
  ["Al-Ma'arij", "The Ascending Stairways", "الـمعارج"],
  ["Nuh", "Noah", "نوح"],
  ["Al-Jinn", "The Jinn", "الجن"],
  ["Al-Muzzammil", "The Enshrouded One", "الـمـزّمّـل"],
  ["Al-Muddaththir", "The Cloaked One", "الـمّـدّثّـر"],
  ["Al-Qiyamah", "The Resurrection", "الـقـيامـة"],
  ["Al-Insan", "The Man", "الإنسان"],
  ["Al-Mursalat", "The Emissaries", "الـمرسلات"],
  ["An-Naba", "The Tidings", "الـنبإ"],
  ["An-Nazi'at", "Those who drag forth", "الـنازعات"],
  ["'Abasa", "He Frowned", "عبس"],
  ["At-Takwir", "The Overthrowing", "التكوير"],
  ["Al-Infitar", "The Cleaving", "الانفطار"],
  ["Al-Mutaffifin", "The Defrauding", "المطـفـفين"],
  ["Al-Inshiqaq", "The Sundering", "الانشقاق"],
  ["Al-Buruj", "The Mansions of the Stars", "البروج"],
  ["At-Tariq", "The Nightcommer", "الـطارق"],
  ["Al-A'la", "The Most High", "الأعـلى"],
  ["Al-Ghashiyah", "The Overwhelming", "الغاشـيـة"],
  ["Al-Fajr", "The Dawn", "الفجر"],
  ["Al-Balad", "The City", "الـبلد"],
  ["Ash-Shams", "The Sun", "الـشـمـس"],
  ["Al-Layl", "The Night", "اللـيـل"],
  ["Ad-Duhaa", "The Morning Hours", "الضـحى"],
  ["Ash-Sharh", "The Relief", "الـشرح"],
  ["At-Tin", "The Fig", "الـتين"],
  ["Al-'Alaq", "The Clot", "الـعلق"],
  ["Al-Qadr", "The Power", "الـقدر"],
  ["Al-Bayyinah", "The Clear Proof", "الـبينة"],
  ["Az-Zalzalah", "The Earthquake", "الـزلزلة"],
  ["Al-'Adiyat", "The Courser", "الـعاديات"],
  ["Al-Qari'ah", "The Calamity", "الـقارعـة"],
  ["At-Takathur", "The Rivalry in world increase", "الـتكاثر"],
  ["Al-'Asr", "The Declining Day", "الـعصر"],
  ["Al-Humazah", "The Traducer", "الـهمزة"],
  ["Al-Fil", "The Elephant", "الـفيل"],
  ["Quraysh", "Quraysh", "قريش"],
  ["Al-Ma'un", "The Small Kindesses", "المـاعون"],
  ["Al-Kawthar", "The Abundance", "الـكوثر"],
  ["Al-Kafirun", "The Disbelievers", "الـكافرون"],
  ["An-Nasr", "The Divine Support", "الـنصر"],
  ["Al-Masad", "The Palm Fiber", "الـمسد"],
  ["Al-Ikhlas", "The Sincerity", "الإخلاص"],
  ["Al-Falaq", "The Daybreak", "الـفلق"],
  ["An-Nas", "The Mankind", "الـناس"],
];

// Make the array lowercase so its not case-sensitive
chapters = chapters.map(list => list.map(book => book.toLowerCase().trim()));

function getChapter(chapter) {
  const c = parseInt(chapter);

  // Chapter is already a number
  if (!isNaN(c)) return c;

  let bookIndex = -1;

  // Attempt to find it in the array
  chapters.forEach((b, idx) => {
    if (b.indexOf(chapter.toLowerCase().trim()) !== -1) {
      // Do +1 as array starts at zero
      bookIndex = idx + 1;
    }
  });

  // For consistency lets stick to strings
  return bookIndex.toString();
}

function parse(input) {
  let results = [];
  let pattern;
  let regex;
  let match;

  /**
   * Q 1:123
   * Q 11: 123
   * Q111:123
   * Quran111:123
   * Quran 1:123
   * Koran 1:111
   * Qur'an 1:111
   */
  pattern = `
    (?:q|quran|koran|qur\\\'an)
      \\s*
      ([\\d]{1,3})
      (?::\\s*
        ([\\d\\s\\-,]+)
      )?
    `;

  regex = new RegExp(pattern.replace(/[\n\s]+/g, ''), 'gi');
  while (match = regex.exec(input)) {
    results.push({
      replace: match[0].trim(),
      type: 'quran',
      chapter: getChapter(match[1]),
      verses: (typeof match[2] === 'undefined') ? null : match[2].replace(/\s/g, '')
    });
  }

  /**
   * <ar|en chapter> 3: 21
   * <ar|en chapter> 21-25
   */
  const chapterList = chapters.map(variations => {
    return variations.map(bookName => escape(bookName)).join('|');
  }).join('|');

  pattern = `
    (?:surat|سورة)?
    \\s*
    (${chapterList}):?
    \\s*
      (?:([\\d]{1,3})\\s*:)?
      \\s+
      ([\\d\\s\\-,]+)
    `;

  regex = new RegExp(pattern.replace(/[\n\s]+/g, ''), 'gi');
  while (match = regex.exec(input)) {
    results.push({
      replace: match[0].trim(),
      type: 'quran',
      chapter: getChapter(match[2] || match[1]),
      verses: (typeof match[3] === 'undefined') ? null : match[3].replace(/\s/g, '')
    });
  }

  return results;
};

export default { parse, getChapter };
export { getChapter, parse };