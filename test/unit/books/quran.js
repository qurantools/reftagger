import { parse, getChapter } from '../../../src/books/quran';

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
  المائدة 10:10
  سورة فاطر 155

  An-Nisa 10
  An-Nisa 1:10
  Surat An-Nisa 10:100-101,112
`.split(/\n/).filter(item => !!item).map(item => item.trim());

describe('Quran', () => {
  describe('parse()', () => {
    refVariations.forEach(str => {
      it(`should have matches for '${str}'`, () => {
        const checkStr = `this is a sentence with ${str} in it`;
        expect(parse(checkStr)).to.be.an('array').and.have.length(1);
      });
    });
  });

  describe('getChapter()', () => {
    it('should return proper book numbers', () => {
      expect(getChapter('An-Nisa')).to.equal(4);
      expect(getChapter('The Rocky Tract')).to.equal(15);
      expect(getChapter('الـفلق')).to.equal(113);
    });
  });
});