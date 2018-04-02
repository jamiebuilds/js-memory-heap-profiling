const memwatch = require('memwatch-next');
const prettyBytes = require('pretty-bytes');

function row(name, size, count, total) {
  return (
    '| ' +
    name.padStart(30) +
    ' | ' +
    size.padEnd(10) +
    ' | ' +
    count.padStart(10) +
    ' | ' +
    total.padStart(10) +
    ' |'
  );
}

let title = row('kind', 'total/n', 'n', 'total');
console.log(title);
console.log('-'.repeat(title.length));

function record(name, count, fn) {
  memwatch.gc();
  let hd = new memwatch.HeapDiff();
  let arr = new Array();
  for (let i = 0; i < count; i++) arr.push(fn());
  let diff = hd.end();
  let total = diff.change.size_bytes;
  console.log(row(name, prettyBytes(total / count), String(count), prettyBytes(total)));
}

function fill(count, obj, fn) {
  for (let i = 0; i < count; i++) fn(obj, i);
  return obj;
}

let i = 0;

// Sanity checks:

record('number', 1000000, () => i++);
record('empty string', 1000000, () => "");
record('true', 1000000, () => true);

// Tests:

record('empty object', 1000000, () => new Object());
record('empty array', 1000000, () => new Array());
record('empty map', 1000000, () => new Map());
record('empty set', 1000000, () => new Set());
record('empty weakmap', 1000000, () => new WeakMap());
record('empty weakset', 1000000, () => new WeakSet());


record('Object.create(null)', 1000000, () => Object.create(null));

function objSet(obj, i) { obj[i] = 0; }
function arrSet(arr, i) { arr.push(0); }
function mapSet(map, i) { map.set(i, 0); }
function setSet(set, i) { set.add(i); }

record('10 item object', 100000, () => fill(10, new Object(), objSet));
record('100 item object', 10000, () => fill(100, new Object(), objSet));
record('1000 item object', 1000, () => fill(1000, new Object(), objSet));

record('10 item array', 100000, () => fill(10, new Array(), arrSet));
record('100 item array', 10000, () => fill(100, new Array(), arrSet));
record('1000 item array', 1000, () => fill(1000, new Array(), arrSet));

record('10 item map', 100000, () => fill(10, new Map(), mapSet));
record('100 item map', 10000, () => fill(100, new Map(), mapSet));
record('1000 item map', 1000, () => fill(1000, new Map(), mapSet));

record('10 item set', 100000, () => fill(10, new Set(), setSet));
record('100 item set', 10000, () => fill(100, new Set(), setSet));
record('1000 item set', 1000, () => fill(1000, new Set(), setSet));

function objDef(obj, i) {
  Object.defineProperty(obj, i, { get: getter });
}

record('10 item object defProp', 100000, () => fill(10, new Object(), objDef));
record('100 item object defProp', 10000, () => fill(100, new Object(), objDef));
record('1000 item object defProp', 1000, () => fill(1000, new Object(), objDef));

function getter() { return 0; }
function objDefRef(obj, i) {
  Object.defineProperty(obj, i, { get: getter });
}

record('10 item object defProp ref', 100000, () => fill(10, new Object(), objDef));
record('100 item object defProp ref', 10000, () => fill(100, new Object(), objDef));
record('1000 item object defProp ref', 1000, () => fill(1000, new Object(), objDef));

let shared = {};

function objShared(obj, i) {
  obj[i] = shared;
}

record('10 item object shared obj', 100000, () => fill(10, new Object(), objShared));
record('100 item object shared obj', 10000, () => fill(100, new Object(), objShared));
record('1000 item object shared obj', 1000, () => fill(1000, new Object(), objShared));

function arrMixed(arr, i) {
  switch (i % 4) {
    case 0: return arr[i] = 0
    case 1: return arr[i] = ""
    case 2: return arr[i] = {}
    case 3: return arr[i] = []
  }
}

record('10 item arr mixed', 100000, () => fill(10, new Array(), arrMixed));
record('100 item arr mixed', 10000, () => fill(100, new Array(), arrMixed));
record('1000 item arr mixed', 1000, () => fill(1000, new Array(), arrMixed));
