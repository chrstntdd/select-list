# select-list

[![Build Status](https://travis-ci.org/chrstntdd/select-list.svg?branch=master)](https://travis-ci.org/chrstntdd/select-list) [![Coverage Status](https://coveralls.io/repos/github/chrstntdd/select-list/badge.svg)](https://coveralls.io/github/chrstntdd/select-list)
[![Size](https://badgen.net/bundlephobia/minzip/select-list)](https://bundlephobia.com/result?p=select-list)

## Highlights

* 📦 Tiny (~500b minified + gzipped ES5)
* 📖 Documented
* ✅ Fully tested
* 🚫 Zero dependencies
* 😎 Immutable[*](#considerations)

## Inspiration / Credits

This module is directly inspired by the [selectlist](https://github.com/rtfeldman/selectlist) elm package by [Richard Feldman](https://github.com/rtfeldman).

## Installation

```shell
$ npm install select-list
```

## Usage

```js
import SelectList from 'select-list'

const s = SelectList([1, 2, 3, 4], 5, [6, 7, 8, 9, 10])

s.selected // -> 5
s.size // -> 10

/* Set the next selected item with a function */
const { before, selected, after } = s.select(x => x === 7)
before // -> [1, 2, 3, 4, 5, 6]
selected // -> 7
after // -> [8, 9]

/* Impossible to move beyond the contents of the SelectList */
s.select(x => x > 42).selected // -> 7

/* Original SelectList remains unchanged */
s.selected // -> 5
```

## Documentation

All documentation has been automatically generated by [TypeDoc](https://github.com/TypeStrong/typedoc) and is available online [here](https://select-list-docs.netlify.com/) and locally in the `/docs` directory.

## Considerations

Of course JavaScript lacks true immutability by default — and in order to keep this module as small as possible, no runtime safeguards exists to ensure true immutability. For this same reason, all public properties must be treated as read-only. Immutability for this package is in reference to how each method that applies a transformation will do so in a manner that returns a new copy of a SelectList.
