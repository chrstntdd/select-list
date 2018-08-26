class SelectList<a> {
  private _before: a[];
  private _selected: a;
  private _after: a[];

  constructor(arr: a[], selectedIndex?: number) {
    selectedIndex = selectedIndex || 0;
    this._before = arr.slice(0, selectedIndex);
    this._selected = arr[selectedIndex];
    this._after = arr.slice(selectedIndex + 1);
  }

  /**
   * @description
   * Shift forwards by one element unless there are no more elements in the `after` section
   */
  public next(): SelectList<a> {
    if (this._after.length) {
      const afterCopy = [...this._after];
      const nextCurrent = afterCopy.shift();

      return new SelectList(
        [...this._before, this._selected, nextCurrent, ...afterCopy],
        this._before.length + 1
      );
    }
    return this;
  }

  /**
   * @description
   * Shift back by one element unless there are no more elements in the `before` section
   */
  public prev(): SelectList<a> {
    if (this._before.length) {
      const beforeCopy = [...this._before];
      const nextCurrent = beforeCopy.pop();

      return new SelectList(
        [...beforeCopy, nextCurrent, this._selected, ...this._after],
        this._before.length - 1
      );
    }
    return this;
  }

  /**
   * @description
   * Apply a function to every element in the SelectList
   */
  public map<b>(fn: (element: a, index?: number, array?: a[]) => b): SelectList<b> {
    return new SelectList(
      [...this._before.map(fn), fn(this._selected), ...this._after.map(fn)],
      this._before.length
    );
  }

  /**
   * @description
   * Return the entire collection as a single array
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
   * Return the currently selected element
   */
  public selected(): a {
    return this._selected;
  }
  /**
   * @description
   * Returns a shallow copy of the elements currently in the `before` section of the SelectList
   */
  public before(): a[] {
    return [...this._before];
  }
  /**
   * @description
   * Returns a shallow copy of the elements currently in the `after` section of the SelectList
   */
  public after(): a[] {
    return [...this._after];
  }
}

export default SelectList;
