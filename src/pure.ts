type SelectListPure<A> = [A[], A, A[]];
type MaybePieces<a> = [a[], a, a[]] | null;
type Position = 'BEFORE' | 'SELECTED' | 'AFTER';

/**
 * @private
 * @description
 * Search through the pieces of the `SelectList` to find the next selected
 * element. Returns null as a Nothing value to the calling function or the
 * pieces to create a new `SelectList`
 */
let selectHelp = <A>(
  predicateFn: (element: A) => boolean,
  before: A[],
  selected: A,
  after: A[]
): MaybePieces<A> => {
  // ( [], [] ) ->
  if (!before.length && !after.length) return null;

  // ( [], head :: rest ) ->
  if (!before.length && after.length) {
    const [head, ...rest] = after;

    if (predicateFn(selected)) return [before, selected, after];
    else if (predicateFn(head)) return [[...before, selected], head, rest];
    else {
      const mP: MaybePieces<A> = selectHelp(predicateFn, [], head, rest);

      if (mP === null) return null;
      return [[selected, ...mP[0]], mP[1], mP[2]];
    }
  }

  // ( head :: rest, _ ) ->
  const [head, ...rest] = before;

  if (predicateFn(head)) return [[], head, [...rest, selected, ...after]];
  else {
    const mP: MaybePieces<A> = selectHelp(predicateFn, rest, selected, after);

    if (mP === null) return null;
    return [[head, ...mP[0]], mP[1], mP[2]];
  }
};

/**
 * @private
 * @description
 * Apply a function to each element in an array by mutating in place
 * The API is somewhat in line with the native `Array.map()`, but
 * instead receives its `Position` type as the third argument
 */
let mapWithPosition = <A, B>(
  array: A[],
  callback: (element: A, index?: number, position?: Position) => B,
  position: Position
): B[] => {
  for (let i = 0; i < array.length; i++) {
    // @ts-ignore
    array[i] = callback(array[i], i, position);
  }
  // @ts-ignore
  return array;
};

/**
 * @description
 * The elements currently in the `before` section of the `SelectList`
 */
let before = <A>(sel: SelectListPure<A>): A[] => sel[0];

/**
 * @description
 * The currently selected element
 */
let selected = <A>(sel: SelectListPure<A>): A => sel[1];

/**
 * @description
 * The elements currently in the `after` section of the `SelectList`
 */
let after = <A>(sel: SelectListPure<A>): A[] => sel[2];

/**
 * @description
 * Shift the selected element to the first element which passes
 * the provided predicate function. If no element is found, the
 * `SelectList` will not be changed
 */
let select = <A>(
  predicateFn: (element: A) => boolean,
  sel: SelectListPure<A>
): SelectListPure<A> => {
  const mP: MaybePieces<A> = selectHelp(predicateFn, sel[0], sel[1], sel[2]);

  if (mP === null) return;

  return [mP[0], mP[1], mP[2]];
};

/**
 * @description
 * Apply a transformation function to each element in the `SelectList`.
 * The transformation function receives a `Position` based on its current
 * location in the `SelectList`
 */
let map = <A, B>(
  fn: (element: A, index?: number, position?: Position) => B,
  sel: SelectListPure<A>
): SelectListPure<B> => [
  mapWithPosition(sel[0], fn, 'BEFORE'),
  fn(sel[1], sel[0].length, 'SELECTED'),
  mapWithPosition(sel[2], fn, 'AFTER')
];

/**
 * @description
 * Add elements to the beginning of the `SelectList`
 */
let prepend = <A>(arr: A[], sel: SelectListPure<A>): SelectListPure<A> => [
  [...arr, ...sel[0]],
  sel[1],
  sel[2]
];

/**
 * @description
 * Add elements to the end of the `SelectList`
 */
let append = <A>(arr: A[], sel: SelectListPure<A>): SelectListPure<A> => [
  sel[0],
  sel[1],
  [...sel[2], ...arr]
];

/**
 * @description
 * Returns the entire collection as a single array
 */
let toArray = <A>(sel: SelectListPure<A>): A[] => [...sel[0], sel[1], ...sel[2]];

export { map, select, before, after, selected, prepend, append, toArray };
