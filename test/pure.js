var n = function(t, r, e, c) {
    if (!r.length && !c.length) return null;
    if (!r.length && c.length) {
      var o = c[0],
        u = c.slice(1);
      return t(e)
        ? [r, e, c]
        : t(o)
          ? [r.concat([e]), o, u]
          : null === (l = n(t, [], o, u))
            ? null
            : [[e].concat(l[0]), l[1], l[2]];
    }
    var l,
      a = r[0],
      f = r.slice(1);
    return t(a)
      ? [[], a, f.concat([e], c)]
      : null === (l = n(t, f, e, c))
        ? null
        : [[a].concat(l[0]), l[1], l[2]];
  },
  t = function(n, t, r) {
    for (var e = 0; e < n.length; e++) n[e] = t(n[e], e, r);
    return n;
  };
(exports.map = function(n, r) {
  return [t(r[0], n, 'BEFORE'), n(r[1], r[0].length, 'SELECTED'), t(r[2], n, 'AFTER')];
}),
  (exports.select = function(t, r) {
    var e = n(t, r[0], r[1], r[2]);
    if (null !== e) return [e[0], e[1], e[2]];
  }),
  (exports.before = function(n) {
    return n[0];
  }),
  (exports.after = function(n) {
    return n[2];
  }),
  (exports.selected = function(n) {
    return n[1];
  }),
  (exports.prepend = function(n, t) {
    return [n.concat(t[0]), t[1], t[2]];
  }),
  (exports.append = function(n, t) {
    return [t[0], t[1], t[2].concat(n)];
  }),
  (exports.toArray = function(n) {
    return n[0].concat([n[1]], n[2]);
  });
//# sourceMappingURL=select-list.js.map
