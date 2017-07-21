(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Reftagger"] = factory();
	else
		root["Reftagger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _quran = __webpack_require__(1);
	
	var _quran2 = _interopRequireDefault(_quran);
	
	var _oldTestament = __webpack_require__(3);
	
	var _oldTestament2 = _interopRequireDefault(_oldTestament);
	
	var _newTestament = __webpack_require__(4);
	
	var _newTestament2 = _interopRequireDefault(_newTestament);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Reftagger = {
	  tag: function tag() {
	    return 'hello';
	  }
	};
	
	exports.default = Reftagger;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getChapter = exports.parse = undefined;
	
	var _escapeStringRegexp = __webpack_require__(2);
	
	var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var chapters = [["Al-Fatihah", "The Opener", "الفاتحة"], ["Al-Baqarah", "The Cow", "البقرة"], ["Ali 'Imran", "Family of Imran", "آل عمران"], ["An-Nisa", "The Women", "النساء"], ["Al-Ma'idah", "The Table Spread", "المائدة"], ["Al-An'am", "The Cattle", "الأنعام"], ["Al-A'raf", "The Heights", "الأعراف"], ["Al-Anfal", "The Spoils of War", "الأنفال"], ["At-Tawbah", "The Repentance", "التوبة"], ["Yunus", "Jonah", "يونس"], ["Hud", "Hud", "هود"], ["Yusuf", "Joseph", "يوسف"], ["Ar-Ra'd", "The Thunder", "الرّعد"], ["Ibrahim", "Abrahim", "إبراهيم"], ["Al-Hijr", "The Rocky Tract", "الحجر"], ["An-Nahl", "The Bee", "النحل"], ["Al-Isra", "The Night Journey", "الإسراء"], ["Al-Kahf", "The Cave", "الكهف"], ["Maryam", "Mary", "مريم"], ["Taha", "Ta-Ha", "طه"], ["Al-Anbya", "The Prophets", "الأنبياء"], ["Al-Haj", "The Pilgrimage", "الحج"], ["Al-Mu'minun", "The Believers", "المؤمنون"], ["An-Nur", "The Light", "النّور"], ["Al-Furqan", "The Criterian", "الفرقان"], ["Ash-Shu'ara", "The Poets", "الشعراء"], ["An-Naml", "The Ant", "النمل"], ["Al-Qasas", "The Stories", "القصص"], ["Al-'Ankabut", "The Spider", "العنكبوت"], ["Ar-Rum", "The Romans", "الروم"], ["Luqman", "Luqman", "لقمان"], ["As-Sajdah", "The Prostration", "السجدة"], ["Al-Ahzab", "The Combined Forces", "الأحزاب"], ["Saba", "Sheba", "سبإ"], ["Fatir", "Originator", "فاطر"], ["Ya-Sin", "Ya Sin", "يس"], ["As-Saffat", "Those who set the Ranks", "الصّافّات"], ["Sad", "The Letter \"Saad\"", "ص"], ["Az-Zumar", "The Troops", "الزمر"], ["Ghafir", "The Forgiver", "غافر"], ["Fussilat", "Explained in Detail", "فصّلت"], ["Ash-Shuraa", "The Consultation", "الشورى"], ["Az-Zukhruf", "The Ornaments of Gold", "الزخرف"], ["Ad-Dukhan", "The Smoke", "الدخان"], ["Al-Jathiyah", "The Crouching", "الجاثية"], ["Al-Ahqaf", "The Wind-Curved Sandhills", "الأحقاف"], ["Muhammad", "Muhammad", "محمّـد"], ["Al-Fath", "The Victory", "الفتح"], ["Al-Hujurat", "The Rooms", "الحُـجُـرات"], ["Qaf", "The Letter \"Qaf\"", "ق"], ["Adh-Dhariyat", "The Winnowing Winds", "الذاريات"], ["At-Tur", "The Mount", "الـطور"], ["An-Najm", "The Star", "الـنحـم"], ["Al-Qamar", "The Moon", "الـقمـر"], ["Ar-Rahman", "The Beneficent", "الـرحـمـن"], ["Al-Waqi'ah", "The Inevitable", "الواقيـة"], ["Al-Hadid", "The Iron", "الحـديد"], ["Al-Mujadila", "The Pleading Woman", "الـمجادلـة"], ["Al-Hashr", "The Exile", "الـحـشـر"], ["Al-Mumtahanah", "She that is to be examined", "الـمـمـتـحنة"], ["As-Saf", "The Ranks", "الـصّـف"], ["Al-Jumu'ah", "The Congregation, Friday", "الـجـمـعـة"], ["Al-Munafiqun", "The Hypocrites", "الـمنافقون"], ["At-Taghabun", "The Mutual Disillusion", "الـتغابن"], ["At-Talaq", "The Divorce", "الـطلاق"], ["At-Tahrim", "The Prohibtiion", "الـتحريم"], ["Al-Mulk", "The Sovereignty", "الـملك"], ["Al-Qalam", "The Pen", "الـقـلـم"], ["Al-Haqqah", "The Reality", "الـحاقّـة"], ["Al-Ma'arij", "The Ascending Stairways", "الـمعارج"], ["Nuh", "Noah", "نوح"], ["Al-Jinn", "The Jinn", "الجن"], ["Al-Muzzammil", "The Enshrouded One", "الـمـزّمّـل"], ["Al-Muddaththir", "The Cloaked One", "الـمّـدّثّـر"], ["Al-Qiyamah", "The Resurrection", "الـقـيامـة"], ["Al-Insan", "The Man", "الإنسان"], ["Al-Mursalat", "The Emissaries", "الـمرسلات"], ["An-Naba", "The Tidings", "الـنبإ"], ["An-Nazi'at", "Those who drag forth", "الـنازعات"], ["'Abasa", "He Frowned", "عبس"], ["At-Takwir", "The Overthrowing", "التكوير"], ["Al-Infitar", "The Cleaving", "الانفطار"], ["Al-Mutaffifin", "The Defrauding", "المطـفـفين"], ["Al-Inshiqaq", "The Sundering", "الانشقاق"], ["Al-Buruj", "The Mansions of the Stars", "البروج"], ["At-Tariq", "The Nightcommer", "الـطارق"], ["Al-A'la", "The Most High", "الأعـلى"], ["Al-Ghashiyah", "The Overwhelming", "الغاشـيـة"], ["Al-Fajr", "The Dawn", "الفجر"], ["Al-Balad", "The City", "الـبلد"], ["Ash-Shams", "The Sun", "الـشـمـس"], ["Al-Layl", "The Night", "اللـيـل"], ["Ad-Duhaa", "The Morning Hours", "الضـحى"], ["Ash-Sharh", "The Relief", "الـشرح"], ["At-Tin", "The Fig", "الـتين"], ["Al-'Alaq", "The Clot", "الـعلق"], ["Al-Qadr", "The Power", "الـقدر"], ["Al-Bayyinah", "The Clear Proof", "الـبينة"], ["Az-Zalzalah", "The Earthquake", "الـزلزلة"], ["Al-'Adiyat", "The Courser", "الـعاديات"], ["Al-Qari'ah", "The Calamity", "الـقارعـة"], ["At-Takathur", "The Rivalry in world increase", "الـتكاثر"], ["Al-'Asr", "The Declining Day", "الـعصر"], ["Al-Humazah", "The Traducer", "الـهمزة"], ["Al-Fil", "The Elephant", "الـفيل"], ["Quraysh", "Quraysh", "قريش"], ["Al-Ma'un", "The Small Kindesses", "المـاعون"], ["Al-Kawthar", "The Abundance", "الـكوثر"], ["Al-Kafirun", "The Disbelievers", "الـكافرون"], ["An-Nasr", "The Divine Support", "الـنصر"], ["Al-Masad", "The Palm Fiber", "الـمسد"], ["Al-Ikhlas", "The Sincerity", "الإخلاص"], ["Al-Falaq", "The Daybreak", "الـفلق"], ["An-Nas", "The Mankind", "الـناس"]];
	
	function getChapter(chapter) {
	  var c = parseInt(chapter);
	
	  // Chapter is already a number
	  if (!isNaN(c)) return c;
	
	  var bookIndex = -1;
	
	  // Attempt to find it in the array
	  chapters.forEach(function (b, idx) {
	    if (b.indexOf(chapter.trim()) !== -1) {
	      // Do +1 as array starts at zero
	      bookIndex = idx + 1;
	    }
	  });
	
	  return bookIndex;
	}
	
	function parse(input) {
	  var results = [];
	  var pattern = void 0;
	  var regex = void 0;
	  var match = void 0;
	
	  /**
	   * Q 1:123
	   * Q 11: 123
	   * Q111:123
	   * Quran111:123
	   * Quran 1:123
	   * Koran 1:111
	   * Qur'an 1:111
	   */
	  pattern = "\n    (?:q|quran|koran|qur\\'an)\n      \\s*\n      ([\\d]{1,3})\n      (?::\\s*\n        ([\\d\\s\\-,]+)\n      )?\n    ";
	
	  regex = new RegExp(pattern.replace(/[\n\s]+/g, ''), 'gi');
	  while (match = regex.exec(input)) {
	    results.push({
	      replace: match[0].trim(),
	      type: 'quran',
	      chapter: getChapter(match[1]),
	      verses: typeof match[2] === 'undefined' ? null : match[2].replace(/\s/g, '')
	    });
	  }
	
	  /**
	   * <chapter> 3: 21
	   * <chapter> 21-25
	   */
	  var chapterList = chapters.map(function (variations) {
	    return variations.map(function (bookName) {
	      return (0, _escapeStringRegexp2.default)(bookName);
	    }).join('|');
	  }).join('|');
	
	  pattern = "\n    (?:surat|\u0633\u0648\u0631\u0629)?\n    \\s*\n    (" + chapterList + ")\n    \\s*\n    (?:([\\d]{1,3})\\s*:)?\n    \\s*\n      (?:\n        ([\\d\\s\\-,]+)\n      )?\n    ";
	
	  regex = new RegExp(pattern.replace(/[\n\s]+/g, ''), 'gi');
	  while (match = regex.exec(input)) {
	    results.push({
	      replace: match[0].trim(),
	      type: 'quran',
	      chapter: getChapter(match[2] || match[1]),
	      verses: typeof match[3] === 'undefined' ? null : match[3].replace(/\s/g, '')
	    });
	  }
	
	  return results;
	};
	
	exports.default = parse;
	exports.parse = parse;
	exports.getChapter = getChapter;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
	
	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}
	
		return str.replace(matchOperatorsRe, '\\$&');
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var OldTestament = {};
	
	exports.default = OldTestament;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NewTestament = {};
	
	exports.default = NewTestament;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=reftagger.js.map