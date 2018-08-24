function SelectList(arr: any[], selectedIndex?: number) {
  selectedIndex = selectedIndex || 0;
  let before: any[] = arr.slice(0, selectedIndex);
  let selected: any = arr[selectedIndex];
  let after: any[] = arr.slice(selectedIndex + 1);

  return {
    /**
     * @description
     * Shift forwards by one element unless there are no more elements in the `after` section
     */
    next(): void {
      if (after.length) {
        const lastCurrent = selected;
        const nextCurrent = after.shift();
        before.push(lastCurrent);
        selected = nextCurrent;
      }
    },
    /**
     * @description
     * Shift back by one element unless there are no more elements in the `before` section
     */
    prev(): void {
      if (before.length) {
        const lastCurrent = selected;
        const nextCurrent = before.shift();
        after.unshift(lastCurrent);
        selected = nextCurrent;
      }
    },
    /**
     * @description
     * Return the entire collection as a single array
     */
    toArray(): any[] {
      return before.concat([selected], after);
    },
    /**
     * @description
     * Return the size of the entire collection
     */
    get size(): number {
      return before.length + 1 + after.length;
    },
    /**
     * @description
     * Return the currently selected element
     */
    get selected(): any {
      return selected;
    },
    /**
     * @description
     * Return the elements currently in the `before` section of the SelectList
     */
    get before(): any[] {
      return before;
    },
    /**
     * @description
     * Return the elements currently in the `after` section of the SelectList
     */
    get after(): any[] {
      return after;
    }
  };
}

export default SelectList;
