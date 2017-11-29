import Quran from '../../../src/books/quran';

const refVariations = `
  Q 1:1
  Q 11:11
  Q 111:111
  Q 111: 111
  Q 111 : 111
  Q 111:20-112,113
  Q23: 1
  Q 23: 1
  Q 23:1

  Quran 1:1
  Quran 11:11
  Quran 111:111
  Quran23: 1
  Quran 23: 1
  Quran 23:1

  Koran 1:1
  Koran 11:11
  Koran 111:111
  Koran23: 1
  Koran 23: 1
  Koran 23:1

  Qur'an 1:1
  Qur'an 11:11
  Qur'an 111:111
  Qur'an23: 1
  Qur'an 23: 1
  Qur'an 23:1

  المائدة 10
  المائدة: 10
  المائدة 10:10
  سورة فاطر 155

  Surat An-Nas 3-5

  The Disbelievers 10
  Al-Kafirun 11
  An-Nisa 10
  An-Nisa 1:10
  Surat An-Nisa 10:100-101,112
`.split(/\n/).filter(item => !!item).map(item => item.trim());

const quran = new Quran();

describe('Quran', () => {
  describe('getVersion()', () => {
    it('should return proper translation', () => {
      expect(quran.getVersion(1, ['quran'])).to.equal('quran');
    });

    it('should return null', () => {
      expect(quran.getVersion('xxx', ['quran', 'tma'])).to.equal(null);
    });
  });

  describe('parse()', () => {
    refVariations.forEach(str => {
      it(`should have matches for '${str}'`, () => {
        const checkStr = `this is a sentence with ${str} in it`;
        expect(quran.parse(checkStr)).to.be.an('array').and.have.length(1);
      });
    });
  });

  describe('getChapter()', () => {
    it('should return proper book numbers', () => {
      expect(quran.getChapter('An-Nisa')).to.equal(4);
      expect(quran.getChapter('an-nisa')).to.equal(4);
      expect(quran.getChapter('The rocky Tract')).to.equal(15);
      expect(quran.getChapter('الفلق')).to.equal(113);
    });
  });

  describe('queryBuilder()', () => {
    it('should return proper GraphQL query', () => {
      const query = Quran.queryBuilder('quran', '1- 3, 5, 8-12');
      expect(query).to.contain('start: 1, end: 3');
      expect(query).to.contain('start: 5, limit: 1');
      expect(query).to.contain('start: 8, end: 12');
    });
  });

  describe('render()', () => {
    it('should return proper html from response', () => {
      const res = {
        'id': '2',
        'name': 'البقرة',
        'verses1': [
          {
            'number': '1',
            'text': 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الم'
          },
          {
            'number': '2',
            'text': 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ'
          },
          {
            'number': '3',
            'text': 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ'
          }
        ],
        'verses5': [
          {
            'number': '5',
            'text': 'أُولَٰئِكَ عَلَىٰ هُدًى مِنْ رَبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ'
          }
        ],
        'verses8': [
          {
            'number': '8',
            'text': 'وَمِنَ النَّاسِ مَنْ يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُمْ بِمُؤْمِنِينَ'
          },
          {
            'number': '9',
            'text': 'يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنْفُسَهُمْ وَمَا يَشْعُرُونَ'
          },
          {
            'number': '10',
            'text': 'فِي قُلُوبِهِمْ مَرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ'
          },
          {
            'number': '11',
            'text': 'وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا فِي الْأَرْضِ قَالُوا إِنَّمَا نَحْنُ مُصْلِحُونَ'
          },
          {
            'number': '12',
            'text': 'أَلَا إِنَّهُمْ هُمُ الْمُفْسِدُونَ وَلَٰكِنْ لَا يَشْعُرُونَ'
          }
        ]
      };
      const html = Quran.render(res);
      expect(html).to.contain('<span class="verse">');
      expect(html).to.contain('<sup>2</sup>');
      expect(html).to.contain('&hellip;');
    });

    it('should return proper html from response from another passage', () => {
      const res = {
        'id': '114',
        'name': 'الناس',
        'verses3': [{
          'number': '3',
          'text': 'إِلَٰهِ النَّاسِ'
        }, {
          'number': '4',
          'text': 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ'
        }, {
          'number': '5',
          'text': 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ'
        }]
      };
      const html = Quran.render(res);
      expect(html).to.contain('<span class="verse">');
      expect(html).to.contain('<sup>3</sup>');
    });
  });
});
