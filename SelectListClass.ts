type Position = 'BEFORE' | 'SELECTED' | 'AFTER';

class SelectList<a> {
  private _before: a[];
  private _selected: a;
  private _after: a[];

  constructor(before: a[], selected: a, after: a[]) {
    this._before = before;
    this._selected = selected;
    this._after = after;
  }

  private static selectHelp<a>(
    predicateFn: (element: a) => boolean,
    before: a[],
    selected: a,
    after: a[]
  ): [a[], a, a[]] | null {
    // ( [], [] ) ->
    if (!before.length && !after.length) return null;

    // ( [], head :: rest ) ->
    if (!before.length && after.length) {
      const [head, ...rest] = after;

      if (predicateFn(selected)) return [before, selected, after];
      else if (predicateFn(head)) return [[...before, selected], head, [...after]];
      else {
        const maybeSelectListParts = SelectList.selectHelp(predicateFn, [], head, rest);

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
      const maybeSelectListParts = SelectList.selectHelp(predicateFn, rest, selected, after);

      if (maybeSelectListParts === null) return null;
      return [[head, ...maybeSelectListParts[0]], maybeSelectListParts[1], maybeSelectListParts[2]];
    }
  }

  /**
   * @description
   * Shift the selected element to the first element which passes
   * the provided predicate function. If no element is found, the
   * `SelectList` will not be changed.
   */
  public select(predicateFn: (element: a) => boolean): SelectList<a> {
    const maybeSelectListParts = SelectList.selectHelp(
      predicateFn,
      this._before,
      this._selected,
      this._after
    );

    if (maybeSelectListParts === null) return this;

    return new SelectList(
      maybeSelectListParts[0],
      maybeSelectListParts[1],
      maybeSelectListParts[2]
    );
  }

  private static mapWithPosition<a, b>(
    array: a[],
    callback: (element: a, index?: number, position?: Position) => b,
    position: Position
  ): b[] {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(callback(array[i], i, position));
    }
    return result;
  }

  /**
   * @description
   * Apply a transformation function to each element in the `SelectList`.
   * The transformation function receives a `Position` based on its current
   * location in the `SelectList`
   */
  public map<b>(fn: (element: a, index?: number, position?: Position) => b): SelectList<b> {
    return new SelectList(
      SelectList.mapWithPosition(this._before, fn, 'BEFORE'),
      fn(this._selected, this._before.length, 'SELECTED'),
      SelectList.mapWithPosition(this._after, fn, 'AFTER')
    );
  }

  /**
   * @description
   * Returns the entire collection as a single array
   */
  public toArray(): a[] {
    return [...this._before, this._selected, ...this._after];
  }

  /**
   * @description
   * Return the size of the entire collection
   */
  public size(): number {
    return this._before.length + 1 + this._after.length;
  }

  /**
   * @description
   * The currently selected element
   */
  public get selected() {
    return this._selected;
  }

  /**
   * @description
   * The elements currently in the `before` section of the SelectList
   */
  public get before() {
    return this._before;
  }

  /**
   * @description
   * The elements currently in the `after` section of the SelectList
   */
  public get after() {
    return this._after;
  }
}

export default SelectList;
