import SelectList from '@/index';

const testArr = ['a', 'b', 'c', 'd', 'e'];

describe('SelectList', () => {
  describe('initialization', () => {
    describe('when a selectedIndex is provided', () => {
      it('should set the `selected` element to the provided index', () => {
        const sel = new SelectList(testArr);

        expect(sel.selected()).toEqual(testArr[0]);
      });
    });

    describe('when a selectedIndex is **NOT** provided', () => {
      it('should set the `selected` element the first element in the input collection', () => {
        const sel = new SelectList(testArr, 3);

        expect(sel.selected()).toEqual(testArr[3]);
      });
    });
  });

  describe('next method', () => {
    describe('when there are elements in the `after` collection', () => {
      it('should advance the select list forwards by one element and return a new SelectList', () => {
        const sel = new SelectList(testArr);

        const next = sel.next();

        expect(next.selected()).toEqual(testArr[1]);
        expect(next).not.toEqual(sel);
      });
    });

    describe('when there are **NOT** elements in the `after` collection', () => {
      it('should not alter the SelectList', () => {
        const sel = new SelectList(testArr, 4);

        expect(sel.selected()).toEqual(testArr[4]);

        const next = sel.next();

        expect(next.selected()).toEqual(testArr[4]);
        expect(next).toEqual(sel);
      });
    });
  });

  describe('prev method', () => {
    describe('when there are elements in the `before` collection', () => {
      it('should shift the select list back by one element and return a new SelectList', () => {
        const sel = new SelectList(testArr, 2);

        expect(sel.selected()).toEqual(testArr[2]);

        const prev = sel.prev();

        expect(prev.selected()).toEqual(testArr[1]);
        expect(prev).not.toEqual(sel);
      });
    });

    describe('when there are **NOT** elements in the `before` collection', () => {
      it('should not alter the SelectList', () => {
        const sel = new SelectList(testArr);

        expect(sel.selected()).toEqual(testArr[0]);

        const prev = sel.prev();

        expect(prev.selected()).toEqual(testArr[0]);
        expect(prev).toEqual(sel);
      });
    });
  });

  describe('map method', () => {
    it('should apply a function to each element in the SelectList', () => {
      const sel = new SelectList(testArr);

      const transformation = sel.map(el => el.toUpperCase()).toArray();

      transformation.forEach((el, i) => expect(el).toEqual(sel.toArray()[i].toUpperCase()));
      expect(sel).not.toEqual(transformation);
    });
  });

  describe('toArray method', () => {
    it('should return the complete collection', () => {
      const sel = new SelectList(testArr);

      expect(sel.toArray()).toEqual(testArr);
    });
  });

  describe('size method', () => {
    it('should return length of the complete collection', () => {
      const sel = new SelectList(testArr);

      expect(sel.size()).toEqual(testArr.length);
    });
  });

  describe('selected method', () => {
    it('should return the currently selected element in the SelectList', () => {
      const sel = new SelectList(testArr);

      expect(sel.selected()).toEqual(testArr[0]);
    });
  });

  describe('before method', () => {
    it('should return the elements in the `before` section of the SelectList', () => {
      const sel = new SelectList(testArr, 2);

      expect(sel.before()).toEqual(['a', 'b']);
    });

    it("should be a copy of the elements in the `before` section so internal state can't be mutated", () => {
      const sel = new SelectList(testArr, 2);

      sel.before().push('d');

      expect(sel.before()).toEqual(['a', 'b']);
    });
  });

  describe('after method', () => {
    it('should return the elements in the `after` section of the SelectList', () => {
      const sel = new SelectList(testArr, 2);

      expect(sel.after()).toEqual(['d', 'e']);
    });

    it("should be a copy of the elements in the `after` section so internal state can't be mutated", () => {
      const sel = new SelectList(testArr, 2);

      sel.after().push('d');

      expect(sel.after()).toEqual(['d', 'e']);
    });
  });
});
