var t = (function() {
  function t(t, e, n) {
    (this._before = t), (this._selected = e), (this._after = n);
  }
  return (
    (t.selectHelp = function(e, n, r, o) {
      if (!n.length && !o.length) return null;
      if (!n.length && o.length) {
        var i = o[0],
          s = o.slice(1);
        return e(r)
          ? [n, r, o]
          : e(i)
            ? [n.concat([r]), i, o.slice()]
            : null === (l = t.selectHelp(e, [], i, s))
              ? null
              : [[r].concat(l[0]), l[1], l[2]];
      }
      var l,
        c = n[0],
        u = n.slice(1);
      return e(c)
        ? [[], c, u.concat([r], o)]
        : null === (l = t.selectHelp(e, u, r, o))
          ? null
          : [[c].concat(l[0]), l[1], l[2]];
    }),
    (t.prototype.fromLists = function(e, n, r) {
      return new t(e, n, r);
    }),
    (t.prototype.select = function(e) {
      var n = t.selectHelp(e, this._before, this._selected, this._after);
      return null === n ? this : new t(n[0], n[1], n[2]);
    }),
    (t.mapWithPosition = function(t, e, n) {
      for (var r = [], o = 0; o < t.length; o++) r.push(e(t[o], o, n));
      return r;
    }),
    (t.prototype.map = function(e) {
      return new t(
        t.mapWithPosition(this._before, e, 'BEFORE'),
        e(this._selected, this._before.length, 'SELECTED'),
        t.mapWithPosition(this._after, e, 'AFTER')
      );
    }),
    (t.prototype.toArray = function() {
      return this._before.concat([this._selected], this._after);
    }),
    (t.prototype.size = function() {
      return this._before.length + 1 + this._after.length;
    }),
    (t.prototype.selected = function() {
      return this._selected;
    }),
    (t.prototype.before = function() {
      return this._before;
    }),
    (t.prototype.after = function() {
      return this._after;
    }),
    t
  );
})();
module.exports = t;
//# sourceMappingURL=select-list.js.map
