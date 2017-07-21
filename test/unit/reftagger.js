import Reftagger from '../../src/reftagger';

describe('Reftagger', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(Reftagger, 'greet');
      Reftagger.greet();
    });

    it('should have been run once', () => {
      expect(Reftagger.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(Reftagger.greet).to.have.always.returned('hello');
    });
  });
});
