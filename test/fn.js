function n(n, t, e) {
  for (var r = 0; r < n.length; r++) n[r] = t(n[r], r, e)
  return n
}
module.exports = function t(e, r, l) {
  return {
    select: function(n) {
      var u = (function n(t, e, r, l) {
        if (!e.length && !l.length) return null
        if (!e.length && l.length) {
          var u = l[0],
            c = l.slice(1)
          return t(r)
            ? [e, r, l]
            : t(u)
            ? [e.concat([r]), u, l.slice()]
            : null === (o = n(t, [], u, c))
            ? null
            : [[r].concat(o[0]), o[1], o[2]]
        }
        var o,
          i = e[0],
          a = e.slice(1)
        return t(i)
          ? [[], i, a.concat([r], l)]
          : null === (o = n(t, a, r, l))
          ? null
          : [[i].concat(o[0]), o[1], o[2]]
      })(n, e, r, l)
      return null === u ? this : t(u[0], u[1], u[2])
    },
    map: function(u) {
      return t(n(e, u, "BEFORE"), u(r, e.length, "SELECTED"), n(l, u, "AFTER"))
    },
    toArray: function() {
      return e.concat([r], l)
    },
    size: function() {
      return e.length + 1 + l.length
    },
    selected: r,
    before: e,
    after: l
  }
}
//# sourceMappingURL=select-list.js.map
