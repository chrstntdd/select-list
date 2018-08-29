import SelectList from '@/index';

const testArr = ['a', 'b', 'c', 'd', 'e'];

describe('SelectList', () => {
  describe('map method', () => {
    it('should apply a function to each element in the SelectList', () => {
      const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

      const transformation = sel.map((el, i, position) => el.toUpperCase()).toArray();

      transformation.forEach((el, i) => expect(el).toEqual(sel.toArray()[i].toUpperCase()));
      expect(sel).not.toEqual(transformation);
    });

    it('should get the position as the third argument', () => {
      const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);
      let positions = [];

      const transformation = sel
        .map((el, i, position) => {
          positions.push(position);
          return el.toUpperCase();
        })
        .toArray();

      transformation.forEach((el, i) => expect(el).toEqual(sel.toArray()[i].toUpperCase()));

      expect(positions[0]).toEqual('BEFORE');
      expect(positions[1]).toEqual('BEFORE');
      expect(positions[2]).toEqual('SELECTED');
      expect(positions[3]).toEqual('AFTER');
      expect(positions[4]).toEqual('AFTER');
    });
  });

  describe('toArray method', () => {
    it('should return the complete collection', () => {
      const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

      expect(sel.toArray()).toEqual(testArr);
    });
  });

  describe('size method', () => {
    it('should return length of the complete collection', () => {
      const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

      expect(sel.size()).toEqual(testArr.length);
    });
  });

  describe('selected method', () => {
    it('should return the currently selected element in the SelectList', () => {
      const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

      expect(sel.selected).toEqual('c');
    });
  });

  describe('before method', () => {
    it('should return the elements in the `before` section of the SelectList', () => {
      const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

      expect(sel.before).toEqual(['a', 'b']);
    });
  });

  describe('after method', () => {
    it('should return the elements in the `after` section of the SelectList', () => {
      const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

      expect(sel.after).toEqual(['d', 'e']);
    });
  });
});
