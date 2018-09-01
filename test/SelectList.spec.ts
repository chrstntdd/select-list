import SelectList from '@/index';

const testArr = ['a', 'b', 'c', 'd', 'e'];

describe('SelectList', () => {
  describe('transformations', () => {
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

    describe('select method', () => {
      it('should no op if the current item is already selected', () => {
        const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

        const nextState = sel.select(x => x === 'c');

        expect(nextState.selected).toEqual('c');
        expect(nextState.before).toEqual(['a', 'b']);
        expect(nextState.after).toEqual(['d', 'e']);
      });

      it('should no op if match cant be found', () => {
        const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

        const nextState = sel.select(x => x === 'nonexistent');

        expect(nextState.selected).toEqual('c');
        expect(nextState.before).toEqual(['a', 'b']);
        expect(nextState.after).toEqual(['d', 'e']);
      });

      describe('selection cases', () => {
        const before = [1, 2, 3, 4];
        const selected = 5;
        const after = [6, 7, 8, 9];
        const selectFn = tag => x => x === tag;
        it('when the selected item is the first item in the `before` section', () => {
          const sel = SelectList(before, selected, after);
          const nextState = sel.select(selectFn(1));

          expect(nextState.selected).toEqual(1);
          expect(nextState.before).toEqual([]);
          expect(nextState.after).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it('when the selected item is somewhere in the middle of the `before` section', () => {
          const sel = SelectList(before, selected, after);
          const nextState = sel.select(selectFn(3));

          expect(nextState.selected).toEqual(3);
          expect(nextState.before).toEqual([1, 2]);
          expect(nextState.after).toEqual([4, 5, 6, 7, 8, 9]);
        });
        it('when the selected item is the last item in the `before` section', () => {
          const sel = SelectList(before, selected, after);
          const nextState = sel.select(selectFn(4));

          expect(nextState.selected).toEqual(4);
          expect(nextState.before).toEqual([1, 2, 3]);
          expect(nextState.after).toEqual([5, 6, 7, 8, 9]);
        });

        it.skip('when the selected item is the first item in the `after` section', () => {
          const sel = SelectList(before, selected, after);
          const nextState = sel.select(selectFn(6));

          expect(nextState.selected).toEqual(6);
          expect(nextState.before).toEqual([1, 2, 3, 4, 5]);
          expect(nextState.after).toEqual([7, 8, 9]);
        });

        it.skip('when the selected item is somewhere in the middle of the `after` section', () => {
          const sel = SelectList(before, selected, after);
          const nextState = sel.select(selectFn(8));

          expect(nextState.selected).toEqual(8);
          expect(nextState.before).toEqual([1, 2, 3, 4, 5, 6, 7]);
          expect(nextState.after).toEqual([9]);
        });

        it.skip('when the selected item is the last item in the `after` section', () => {
          const sel = SelectList(before, selected, after);
          const nextState = sel.select(selectFn(9));

          expect(nextState.selected).toEqual(9);
          expect(nextState.before).toEqual([1, 2, 3, 4, 5, 6, 7, 9]);
          expect(nextState.after).toEqual([]);
        });
      });

      const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

      const nextState = sel.select(x => x === 'e');

      expect(nextState.selected).toEqual('e');
      expect(nextState.before).toEqual(['a', 'b', 'c', 'd']);
      // expect(nextState.after).toEqual([]);
    });
  });

  describe('reading data', () => {
    describe('toArray method', () => {
      it('should return the complete collection', () => {
        const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

        expect(sel.toArray()).toEqual(testArr);
      });
    });
    describe('size getter', () => {
      it('should return length of the complete collection', () => {
        const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

        expect(sel.size()).toEqual(testArr.length);
      });
    });
    describe('select getter', () => {
      it('should return the currently selected element in the SelectList', () => {
        const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

        expect(sel.selected).toEqual('c');
      });
    });

    describe('before getter', () => {
      it('should return the elements in the `before` section of the SelectList', () => {
        const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

        expect(sel.before).toEqual(['a', 'b']);
      });
    });

    describe('after getter', () => {
      it('should return the elements in the `after` section of the SelectList', () => {
        const sel = SelectList(['a', 'b'], 'c', ['d', 'e']);

        expect(sel.after).toEqual(['d', 'e']);
      });
    });
  });
});
