var e = (function() {
  function e(e, t, n) {
    (this._before = e), (this._selected = t), (this._after = n);
  }
  return (
    (e.selectHelp = function(t, n, r, o) {
      if (!n.length && !o.length) return null;
      if (!n.length && o.length) {
        var i = o[0],
          l = o.slice(1);
        return t(r)
          ? [n, r, o]
          : t(i)
            ? [n.concat([r]), i, o.slice()]
            : null === (c = e.selectHelp(t, [], i, l))
              ? null
              : [[r].concat(c[0]), c[1], c[2]];
      }
      var c,
        s = n[0],
        u = n.slice(1);
      return t(s)
        ? [[], s, u.concat([r], o)]
        : null === (c = e.selectHelp(t, u, r, o))
          ? null
          : [[s].concat(c[0]), c[1], c[2]];
    }),
    (e.prototype.select = function(t) {
      var n = e.selectHelp(t, this._before, this._selected, this._after);
      return null === n ? this : new e(n[0], n[1], n[2]);
    }),
    (e.mapWithPosition = function(e, t, n) {
      for (var r = 0; r < e.length; r++) e[r] = t(e[r], r, n);
      return e;
    }),
    (e.prototype.map = function(t) {
      return new e(
        e.mapWithPosition(this._before, t, 'BEFORE'),
        t(this._selected, this._before.length, 'SELECTED'),
        e.mapWithPosition(this._after, t, 'AFTER')
      );
    }),
    (e.prototype.toArray = function() {
      return this._before.concat([this._selected], this._after);
    }),
    (e.prototype.size = function() {
      return this._before.length + 1 + this._after.length;
    }),
    Object.defineProperty(e.prototype, 'selected', {
      get: function() {
        return this._selected;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, 'before', {
      get: function() {
        return this._before;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, 'after', {
      get: function() {
        return this._after;
      },
      enumerable: !0,
      configurable: !0
    }),
    e
  );
})();
module.exports = function(t, n, r) {
  return new e(t, n, r);
};
//# sourceMappingURL=select-list.js.map
