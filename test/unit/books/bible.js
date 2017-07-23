import { parse, getBook } from '../../../src/books/bible';

const refVariations = `
  Ps 139: 1-2
  Psalm 139: 1-2
  Psalms 139 :10-150
`.split(/\n/).filter(item => !!item).map(item => item.trim());

describe('Bible', () => {
  describe('parse()', () => {
    refVariations.forEach(str => {
      it(`should have matches for '${str}'`, () => {
        const checkStr = `this is a sentence with ${str} in it`;
        expect(parse(checkStr)).to.be.an('array').and.have.length(1);
      });
    });
  });

  describe('getBook()', () => {
    it('should return proper book IDs', () => {
      expect(getBook('Ps')).to.equal('psa');
      expect(getBook('psa')).to.equal('psa');
    });
  });
});