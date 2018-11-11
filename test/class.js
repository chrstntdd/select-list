var t = function(e, r, n, o) {
    if (!r.length && !o.length) return 0;
    if (!r.length && o.length) {
      var i = o[0],
        c = o.slice(1);
      return e(n)
        ? [r, n, o]
        : e(i)
        ? [r.concat([n]), i, c]
        : (s = t(e, [], i, c))
        ? [[n].concat(s[0]), s[1], s[2]]
        : 0;
    }
    var s,
      h = r[0],
      f = r.slice(1);
    return e(h)
      ? [[], h, f.concat([n], o)]
      : (s = t(e, f, n, o))
      ? [[h].concat(s[0]), s[1], s[2]]
      : 0;
  },
  e = function(t, e, r) {
    for (var n = 0; n < t.length; n++) t[n] = e(t[n], n, r);
    return t;
  },
  r = (function() {
    function r(t, e, r) {
      (this.before = t),
        (this.selected = e),
        (this.after = r),
        (this.size = t.length + 1 + r.length);
    }
    return (
      (r.prototype.select = function(e) {
        var r = t(e, this.before, this.selected, this.after);
        return r ? n(r[0], r[1], r[2]) : this;
      }),
      (r.prototype.map = function(t) {
        return n(
          e(this.before, t, 'BEFORE'),
          t(this.selected, this.before.length, 'SELECTED'),
          e(this.after, t, 'AFTER')
        );
      }),
      (r.prototype.prepend = function(t) {
        return n(t.concat(this.before), this.selected, this.after);
      }),
      (r.prototype.append = function(t) {
        return n(this.before, this.selected, this.after.concat(t));
      }),
      (r.prototype.toArray = function() {
        return this.before.concat([this.selected], this.after);
      }),
      r
    );
  })();
function n(t, e, n) {
  return new r(t, e, n);
}
module.exports = n;
//# sourceMappingURL=select-list.js.map
