export type SelectList<A> = [A[], A, A[]];
export type MaybePieces<A> = SelectList<A> | 0;
export type Position = 'BEFORE' | 'SELECTED' | 'AFTER';

/**
 * @private
 * @description
 * Search through the pieces of the `SelectList` to find the next selected
 * element. Returns 0 as a Nothing value to the calling function or the
 * pieces to create a new `SelectList`
 */
let selectHelp = <A>(
  predicateFn: (element: A) => boolean,
  before: A[],
  selected: A,
  after: A[]
): MaybePieces<A> => {
  // ( [], [] ) ->
  if (!before.length && !after.length) return 0;

  // ( [], head :: rest ) ->
  if (!before.length && after.length) {
    let [head, ...rest] = after;

    if (predicateFn(selected)) return [before, selected, after];
    else if (predicateFn(head)) return [[...before, selected], head, rest];
    else {
      let mP: MaybePieces<A> = selectHelp(predicateFn, [], head, rest);

      if (!mP) return 0;
      return [[selected, ...mP[0]], mP[1], mP[2]];
    }
  }

  // ( head :: rest, _ ) ->
  let [head, ...rest] = before;

  if (predicateFn(head)) return [[], head, [...rest, selected, ...after]];
  else {
    let mP: MaybePieces<A> = selectHelp(predicateFn, rest, selected, after);

    if (!mP) return 0;
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
 * Shift the selected element to the first element which passes
 * the provided predicate function. If no element is found, the
 * `SelectList` will not be changed
 */
let select = <A>(predicateFn: (element: A) => boolean, sel: SelectList<A>): SelectList<A> => {
  let mP: MaybePieces<A> = selectHelp(predicateFn, sel[0], sel[1], sel[2]);

  if (!mP) return sel;

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
  sel: SelectList<A>
): SelectList<B> => [
  mapWithPosition(sel[0], fn, 'BEFORE'),
  fn(sel[1], sel[0].length, 'SELECTED'),
  mapWithPosition(sel[2], fn, 'AFTER')
];

/**
 * @description
 * Add elements to the beginning of the `SelectList`
 */
let prepend = <A>(arr: A[], sel: SelectList<A>): SelectList<A> => [
  [...arr, ...sel[0]],
  sel[1],
  sel[2]
];

/**
 * @description
 * Add elements to the end of the `SelectList`
 */
let append = <A>(arr: A[], sel: SelectList<A>): SelectList<A> => [
  sel[0],
  sel[1],
  [...sel[2], ...arr]
];

/**
 * @description
 * Returns the entire collection as a single array
 */
let toArray = <A>(sel: SelectList<A>): A[] => [...sel[0], sel[1], ...sel[2]];

export { map, select, prepend, append, toArray };
