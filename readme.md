# select-list

[![Build Status](https://travis-ci.org/chrstntdd/select-list.svg?branch=master)](https://travis-ci.org/chrstntdd/select-list) [![Coverage Status](https://coveralls.io/repos/github/chrstntdd/select-list/badge.svg?branch=class-rewrite)](https://coveralls.io/github/chrstntdd/select-list?branch=class-rewrite)

> A `SelectList` is a nonempty list that will always have one element selected.
> 
> — <cite>Richard Feldman</cite>

## Highlights

* 📦 Tiny (~500b minified + gzipped ES5)
* 📖 Documented
* ✅ Fully tested
* 🚫 Zero dependencies
* 😎 Immutable

## Inspiration / Credits

This module is directly inspired by the [selectlist](https://github.com/rtfeldman/selectlist) elm package by [Richard Feldman](https://github.com/rtfeldman).

## Installation

```shell
$ npm install select-list
```

## Usage

```js
import SelectList from 'select-list';

const s = SelectList([1, 2, 3, 4], 5, [6, 7, 8, 9, 10]);

s.selected // -> 5

/* Set the next selected item with a function */
s.select(x => x === 7).selected; // -> 7

/* Impossible to move beyond the contents of the SelectList */
s.select(x => x > 42).selected; // -> 7

/* Original SelectList remains unchanged */
s.selected; // -> 5
```

## Documentation

All documentation has been automatically generated by [TypeDoc](https://github.com/TypeStrong/typedoc) and is available online [here](https://select-list-docs.netlify.com/) and locally in the `/docs` directory.
