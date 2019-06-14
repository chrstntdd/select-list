type Position = 'BEFORE' | 'SELECTED' | 'AFTER'

type MaybePieces<a> = [a[], a, a[]] | 0

/**
 * @private
 *
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
  if (!before.length && !after.length) return 0

  // ( [], head :: rest ) ->
  if (!before.length && after.length) {
    const [head, ...rest] = after

    if (predicateFn(selected)) return [before, selected, after]
    else if (predicateFn(head)) return [[...before, selected], head, rest]
    else {
      const mP: MaybePieces<A> = selectHelp(predicateFn, [], head, rest)

      if (!mP) return 0
      return [[selected, ...mP[0]], mP[1], mP[2]]
    }
  }

  // ( head :: rest, _ ) ->
  const [head, ...rest] = before

  if (predicateFn(head)) return [[], head, [...rest, selected, ...after]]
  else {
    const mP: MaybePieces<A> = selectHelp(predicateFn, rest, selected, after)

    if (!mP) return 0
    return [[head, ...mP[0]], mP[1], mP[2]]
  }
}

/**
 * @private
 *
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
    array[i] = callback(array[i], i, position)
  }
  // @ts-ignore
  return array
}

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
  public readonly selected: a

  /**
   * @description
   * The elements currently in the `before` section of the `SelectList`
   */
  public readonly before: a[]

  /**
   * @description
   * The elements currently in the `after` section of the `SelectList`
   */
  public readonly after: a[]

  /**
   * @description
   * The size of the entire collection
   */
  public readonly size: number

  constructor(before: a[], selected: a, after: a[]) {
    this.before = before
    this.selected = selected
    this.after = after
    this.size = before.length + 1 + after.length
  }

  /**
   * @description
   * Shift the selected element to the first element which passes
   * the provided predicate function. If no element is found, the
   * `SelectList` will not be changed
   */
  public select(predicateFn: (element: a) => boolean): SelectListImpl<a> {
    const mP = selectHelp(predicateFn, this.before, this.selected, this.after)

    if (!mP) return this

    return SelectList(mP[0], mP[1], mP[2])
  }

  /**
   * @description
   * Apply a transformation function to each element in the `SelectList`.
   * The transformation function receives a `Position` based on its current
   * location in the `SelectList`
   */
  public map<b>(fn: (element: a, index?: number, position?: Position) => b): SelectListImpl<b> {
    return SelectList(
      mapWithPosition(this.before, fn, 'BEFORE'),
      fn(this.selected, this.before.length, 'SELECTED'),
      mapWithPosition(this.after, fn, 'AFTER')
    )
  }

  /**
   * @description
   * Add elements to the beginning of the `SelectList`
   */
  public prepend(arr: a[]) {
    return SelectList([...arr, ...this.before], this.selected, this.after)
  }

  /**
   * @description
   * Add elements to the end of the `SelectList`
   */
  public append(arr: a[]) {
    return SelectList(this.before, this.selected, [...this.after, ...arr])
  }

  /**
   * @description
   * Returns the entire collection as a single array
   */
  public toArray(): a[] {
    return [...this.before, this.selected, ...this.after]
  }
}

/**
 * @description
 * Wraps call to create new instance of a `SelectList`
 */
export default function SelectList<a>(before: a[], selected: a, after: a[]) {
  return new SelectListImpl(before, selected, after)
}

// export * from './pure';
