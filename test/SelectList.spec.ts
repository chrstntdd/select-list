import SelectList from '@/index';

const testArr = ['a', 'b', 'c', 'd', 'e'];

describe('SelectList', () => {
  describe('initialization', () => {
    describe('when a selectedIndex is provided', () => {
      it('should set the `selected` element to the provided index', () => {
        const sel = SelectList(testArr);

        expect(sel.selected).toStrictEqual(testArr[0]);
      });
    });
    describe('when a selectedIndex is **NOT** provided', () => {
      it('should set the `selected` element the first element in the input collection', () => {
        const sel = SelectList(testArr, 3);

        expect(sel.selected).toStrictEqual(testArr[3]);
      });
    });
  });
  describe('next function', () => {
    describe('when there are elements in the `after` collection', () => {
      it('should advance the select list forwards by one element', () => {
        const sel = SelectList(testArr);

        expect(sel.selected).toStrictEqual(testArr[0]);

        sel.next();

        expect(sel.selected).toStrictEqual(testArr[1]);
      });
    });

    describe('when there are **NOT** elements in the `after` collection', () => {
      it('should not alter the SelectList', () => {
        const sel = SelectList(testArr, 4);

        expect(sel.selected).toStrictEqual(testArr[4]);

        sel.next();

        expect(sel.selected).toStrictEqual(testArr[4]);
      });
    });
  });

  describe('prev function', () => {
    describe('when there are elements in the `before` collection', () => {
      it('should advance the select list forwards by one element', () => {
        const sel = SelectList(testArr, 1);

        expect(sel.selected).toStrictEqual(testArr[1]);

        sel.prev();

        expect(sel.selected).toStrictEqual(testArr[0]);
      });
    });

    describe('when there are **NOT** elements in the `before` collection', () => {
      it('should not alter the SelectList', () => {
        const sel = SelectList(testArr);

        expect(sel.selected).toStrictEqual(testArr[0]);

        sel.prev();

        expect(sel.selected).toStrictEqual(testArr[0]);
      });
    });
  });

  describe('toArray function', () => {
    it('should return the complete collection', () => {
      const sel = SelectList(testArr);

      expect(sel.toArray()).toStrictEqual(testArr);
    });
  });

  describe('size getter', () => {
    it('should return length of the complete collection', () => {
      const sel = SelectList(testArr);

      expect(sel.size).toStrictEqual(testArr.length);
    });
  });

  describe('selected getter', () => {
    it('should return the currently selected element in the SelectList', () => {
      const sel = SelectList(testArr);

      expect(sel.selected).toStrictEqual(testArr[0]);
    });
  });

  describe('before getter', () => {
    it('should return the elements in the `before` section of the SelectList', () => {
      const sel = SelectList(testArr, 2);

      expect(sel.before).toStrictEqual(['a', 'b']);
    });
  });

  describe('after getter', () => {
    it('should return the elements in the `after` section of the SelectList', () => {
      const sel = SelectList(testArr, 2);

      expect(sel.after).toStrictEqual(['d', 'e']);
    });
  });
});
