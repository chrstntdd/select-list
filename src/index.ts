type Position = 'BEFORE' | 'SELECTED' | 'AFTER';

type MaybePieces<a> = [a[], a, a[]] | null;

/**
 * @description
 * A nonempty list that will always have one element selected
 *
 * **NOTE**
 * For size and performance reasons, the public properties are not
 * truly immutable, meaning they _can_ be reassigned, but doing so
 * will result in unexpected behavior due to mutations made to
 * internal state. Please treat them as readonly — as intended
 */
class SelectListImpl<a> {
  /**
   * @description
   * The currently selected element
   */
  public readonly selected: a;

  /**
   * @description
   * The elements currently in the `before` section of the `SelectList`
   */
  public readonly before: a[];

  /**
   * @description
   * The elements currently in the `after` section of the `SelectList`
   */
  public readonly after: a[];

  /**
   * @description
   * The size of the entire collection
   */
  public readonly size: number;

  constructor(before: a[], selected: a, after: a[]) {
    this.before = before;
    this.selected = selected;
    this.after = after;
    this.size = before.length + 1 + after.length;
  }

  /**
   * @description
   * Search through the pieces of the `SelectList` to find the next selected
   * element. Returns null as a Nothing value to the calling function or the
   * pieces to create a new `SelectList`
   */
  private static selectHelp<a>(
    predicateFn: (element: a) => boolean,
    before: a[],
    selected: a,
    after: a[]
  ): MaybePieces<a> {
    // ( [], [] ) ->
    if (!before.length && !after.length) return null;

    // ( [], head :: rest ) ->
    if (!before.length && after.length) {
      const [head, ...rest] = after;

      if (predicateFn(selected)) return [before, selected, after];
      else if (predicateFn(head)) return [[...before, selected], head, rest];
      else {
        const mP: MaybePieces<a> = SelectListImpl.selectHelp(predicateFn, [], head, rest);

        if (mP === null) return null;
        return [[selected, ...mP[0]], mP[1], mP[2]];
      }
    }

    // ( head :: rest, _ ) ->
    const [head, ...rest] = before;

    if (predicateFn(head)) return [[], head, [...rest, selected, ...after]];
    else {
      const mP: MaybePieces<a> = SelectListImpl.selectHelp(predicateFn, rest, selected, after);

      if (mP === null) return null;
      return [[head, ...mP[0]], mP[1], mP[2]];
    }
  }

  /**
   * @description
   * Shift the selected element to the first element which passes
   * the provided predicate function. If no element is found, the
   * `SelectList` will not be changed
   */
  public select(predicateFn: (element: a) => boolean): SelectListImpl<a> {
    const mP = SelectListImpl.selectHelp(predicateFn, this.before, this.selected, this.after);

    if (mP === null) return this;

    return new SelectListImpl(mP[0], mP[1], mP[2]);
  }

  /**
   * @description
   * Apply a function to each element in an array by mutating in place
   * The API is somewhat in line with the native `Array.map()`, but
   * instead receives its `Position` type as the third argument
   */
  private static mapWithPosition<a, b>(
    array: a[],
    callback: (element: a, index?: number, position?: Position) => b,
    position: Position
  ): b[] {
    for (let i = 0; i < array.length; i++) {
      // @ts-ignore
      array[i] = callback(array[i], i, position);
    }
    // @ts-ignore
    return array;
  }

  /**
   * @description
   * Apply a transformation function to each element in the `SelectList`.
   * The transformation function receives a `Position` based on its current
   * location in the `SelectList`
   */
  public map<b>(fn: (element: a, index?: number, position?: Position) => b): SelectListImpl<b> {
    return new SelectListImpl(
      SelectListImpl.mapWithPosition(this.before, fn, 'BEFORE'),
      fn(this.selected, this.before.length, 'SELECTED'),
      SelectListImpl.mapWithPosition(this.after, fn, 'AFTER')
    );
  }

  /**
   * @description
   * Add elements to the beginning of the `SelectList`
   */
  public prepend(arr: a[]) {
    return new SelectListImpl([...arr, ...this.before], this.selected, this.after);
  }

  /**
   * @description
   * Add elements to the end of the `SelectList`
   */
  public append(arr: a[]) {
    return new SelectListImpl(this.before, this.selected, [...this.after, ...arr]);
  }

  /**
   * @description
   * Returns the entire collection as a single array
   */
  public toArray(): a[] {
    return [...this.before, this.selected, ...this.after];
  }
}

/**
 * @description
 * Wraps call to create new instance of a `SelectList`
 */
export default function SelectList<a>(before: a[], selected: a, after: a[]) {
  return new SelectListImpl(before, selected, after);
}

// export * from './pure';
