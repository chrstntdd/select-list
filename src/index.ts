interface SelectList<a> {
  /**
   * @description
   * Shift to the selected element based on the provided predicate function
   */
  select: <a>(predicateFn: (element: a) => boolean) => SelectList<a>;
  /**
   * @description
   * Apply a function to every element in the SelectList
   */
  map: <b>(fn: (element: a, index?: number, position?: Position) => b) => SelectList<b>;
  /**
   * @description
   *s he entire collection as a single array
   */
  toArray: () => a[];
  /**
   * @description
   * Return the size of the entire collection
   */
  size: () => number;
  /**
   * @description
   * The currently selected element
   */
  selected: a;
  /**
   * @description
   * The elements currently in the `before` section of the SelectList
   */
  before: a[];
  /**
   * @description
   * The elements currently in the `after` section of the SelectList
   */
  after: a[];
}

/**
 * @private
 */
function selectHelp(
  predicateFn: (element: any) => boolean,
  before: any[],
  selected: any,
  after: any[]
): [any[], any, any[]] | null {
  // ( [], [] ) ->
  if (!before.length && !after.length) return null;

  // ( [], head :: rest ) ->
  if (!before.length && after.length) {
    const [head, ...rest] = after;

    if (predicateFn(selected)) return [before, selected, after];
    else if (predicateFn(head)) return [[...before, selected], head, [...after]];
    else {
      const maybeSelectListParts = selectHelp(predicateFn, [], head, rest);

      if (maybeSelectListParts === null) return null;
      return [
        [selected, ...maybeSelectListParts[0]],
        maybeSelectListParts[1],
        maybeSelectListParts[2]
      ];
    }
  }

  // ( head :: rest, _ ) ->
  const [head, ...rest] = before;

  if (predicateFn(head)) return [[], head, [...rest, selected, ...after]];
  else {
    const maybeSelectListParts = selectHelp(predicateFn, rest, selected, after);

    if (maybeSelectListParts === null) return null;
    return [[head, ...maybeSelectListParts[0]], maybeSelectListParts[1], maybeSelectListParts[2]];
  }
}

/**
 * @private
 */
function map(
  array: any[],
  callback: (element: any, index?: number, position?: Position) => any,
  position: Position
) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, position));
  }
  return result;
}

type Position = 'BEFORE' | 'SELECTED' | 'AFTER';

function SelectList<a>(before: a[], selected: a, after: a[]): SelectList<a> {
  return {
    select<a>(predicateFn: (element: a) => boolean): SelectList<a> {
      const maybeSelectListParts = selectHelp(predicateFn, before, selected, after);
      if (maybeSelectListParts === null) return this;

      return SelectList(maybeSelectListParts[0], maybeSelectListParts[1], maybeSelectListParts[2]);
    },

    map<b>(fn: (element: a, index?: number, position?: Position) => b): SelectList<b> {
      return SelectList(
        map(before, fn, 'BEFORE'),
        fn(selected, before.length, 'SELECTED'),
        map(after, fn, 'AFTER')
      );
    },

    toArray(): a[] {
      return [...before, selected, ...after];
    },

    size(): number {
      return before.length + 1 + after.length;
    },

    selected,

    before,

    after
  };
}

export default SelectList;
