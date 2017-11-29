import Bible from '../../../src/books/bible';

const refVariations = `
  Ps 139: 1-2
  Psalm 139: 1-2
  Psalms 139 :10-150
  Esther 10: 1
  1 Peter 1:14
  1 Cor 3: 15-40, 10
  The Revelation 10
`.split(/\n/).filter(item => !!item).map(item => item.trim());

const bible = new Bible();

describe('Bible', () => {
  describe('getVersion()', () => {
    it('should return proper translation', () => {
      expect(bible.getVersion('psa', ['injil', 'tma'])).to.equal('tma');
      expect(bible.getVersion('mat', ['injil', 'tma'])).to.equal('injil');
    });

    it('should return null', () => {
      expect(bible.getVersion('xxx', ['tma'])).to.equal(null);
    });
  });

  describe('parse()', () => {
    refVariations.forEach(str => {
      it(`should have matches for '${str}'`, () => {
        const checkStr = `this is a sentence with ${str} in it`;
        expect(bible.parse(checkStr)).to.be.an('array').and.have.length(1);
      });
    });
  });

  describe('getBook()', () => {
    it('should return proper book IDs', () => {
      expect(bible.getBook('psa')).to.equal('psa');
      expect(bible.getBook('Ps')).to.equal('psa');
    });
  });

  describe('queryBuilder()', () => {
    it('should return proper GraphQL query', () => {
      const query = Bible.queryBuilder('bible', '1- 3, 5, 8-12');
      expect(query).to.contain('start: 1, end: 3');
      expect(query).to.contain('start: 5, limit: 1');
      expect(query).to.contain('start: 8, end: 12');
    });
  });

  describe('render()', () => {
    var res = {
      'id': '1',
      'name': 'المزمور الأوّل',
      'verses1': [
        {
          'number': '1',
          'text': 'ألا لِيَقَرَّ عَينًا، ذاكَ الّذي لا يَستَرشِدُ بِنَصائِحِ الأثَمَةِ'
        },
        {
          'number': '2',
          'text': 'بَل كانَ هَواهُ كِتابَ اللهِ'
        },
        {
          'number': '3',
          'text': 'مَثَلُهُ مثَلُ شَجَرةٍ غُرِسَتْ على مَجرَى ماءٍ'
        }
      ],
      'verses5': [
        {
          'number': '5',
          'text': 'لا الكَفَرَةُ يَومَ الحِسابِ يَثبُتونَ'
        }
      ],
      'verses8': []
    };

    it('should return proper html from response', () => {
      const html = Bible.render(res);
      expect(html).to.contain('<span class="verse">');
      expect(html).to.contain('<sup>5</sup>');
    });
  });
});
