const Benchmark = require('benchmark');

const Class = require('./class');
const Fn = require('./fn');

let oneMil;
let tenK;
let hunnid;
let ten;
const transformationFn = x => x + 1;

const initializeBench = () => {
  const setup = n => {
    const arr = Array(n)
      .fill(0)
      .map((_, i) => i + 1);

    const halfway = n / 2;
    const before = arr.slice(0, halfway);
    const after = arr.slice(halfway);

    return { before, after };
  };

  oneMil = setup(1000000);
  tenK = setup(10000);
  hunnid = setup(100);
  ten = setup(10);
};

const suite = new Benchmark.Suite('Benchmarking fn vs class using map method of SelectList', {
  setup: initializeBench()
});

suite
  .add('fn map 10 elements', function() {
    const sel = Fn(ten.before, 1, ten.after);
    sel.map(transformationFn);
  })
  .add('fn map 100 elements', function() {
    const sel = Fn(hunnid.before, 1, hunnid.after);
    sel.map(transformationFn);
  })
  .add('fn map 10000 elements', function() {
    const sel = Fn(tenK.before, 1, tenK.after);
    sel.map(transformationFn);
  })
  .add('fn map 1000000 elements', function() {
    const sel = Fn(oneMil.before, 1, oneMil.after);
    sel.map(transformationFn);
  })
  .add('class map 10 elements', function() {
    const sel = Class(ten.before, 1, ten.after);
    sel.map(transformationFn);
  })
  .add('class map 100 elements', function() {
    const sel = Class(hunnid.before, 1, hunnid.after);
    sel.map(transformationFn);
  })
  .add('class map 10000 elements', function() {
    const sel = Class(tenK.before, 1, tenK.after);
    sel.map(transformationFn);
  })
  .add('class map 1000000 elements', function() {
    const sel = Class(oneMil.before, 1, oneMil.after);
    sel.map(transformationFn);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    // console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .on('error', function(event) {
    console.log(event.target.error.message);
    throw event.target.error;
  })
  .run();
