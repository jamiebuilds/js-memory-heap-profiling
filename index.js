const memwatch = require('memwatch-next');

if (typeof global.gc !== 'function') {
  console.error('Must be run with `node --expose-gc`');
  process.exit(1);
}

function record(count, fn) {
  global.gc();
  let hd = new memwatch.HeapDiff();
  let arr = new Array();
  for (let i = 0; i < count; i++) arr.push(fn());
  let diff = hd.end();
  return diff.change.size_bytes / count;
}

function fill(count, obj, fn) {
  for (let i = 0; i < count; i++) fn(obj, i);
  return obj;
}

let results = {};

let i = 0;

// Sanity checks:

results['number'] = record(1000000, () => i++);
results['empty string'] = record(1000000, () => "");
results['true'] = record(1000000, () => true);

// Tests:

results['empty object'] = record(1000000, () => new Object());
results['empty array'] = record(1000000, () => new Array());
results['empty map'] = record(1000000, () => new Map());
results['empty set'] = record(1000000, () => new Set());

function objSet(obj, i) { obj[i] = 0; }
function arrSet(arr, i) { arr.push(0); }
function mapSet(map, i) { map.set(i, 0); }
function setSet(set, i) { set.add(i); }

results['10 item object'] = record(100000, () => fill(10, new Object(), objSet));
results['10 item array'] = record(100000, () => fill(10, new Array(), arrSet));
results['10 item map'] = record(100000, () => fill(10, new Map(), mapSet));
results['10 item set'] = record(100000, () => fill(10, new Set(), setSet));

results['100 item object'] = record(10000, () => fill(100, new Object(), objSet));
results['100 item array'] = record(10000, () => fill(100, new Array(), arrSet));
results['100 item map'] = record(10000, () => fill(100, new Map(), mapSet));
results['100 item set'] = record(10000, () => fill(100, new Set(), setSet));

results['1000 item object'] = record(1000, () => fill(1000, new Object(), objSet));
results['1000 item array'] = record(1000, () => fill(1000, new Array(), arrSet));
results['1000 item map'] = record(1000, () => fill(1000, new Map(), mapSet));
results['1000 item set'] = record(1000, () => fill(1000, new Set(), setSet));

function objDef(obj, i) {
  Object.defineProperty(obj, i, { get: getter });
}

results['10 item object defProp'] = record(100000, () => fill(10, new Object(), objDef));
results['100 item object defProp'] = record(10000, () => fill(100, new Object(), objDef));
results['1000 item object defProp'] = record(1000, () => fill(1000, new Object(), objDef));

function getter() { return 0; }
function objDefRef(obj, i) {
  Object.defineProperty(obj, i, { get: getter });
}

results['10 item object defProp ref'] = record(100000, () => fill(10, new Object(), objDef));
results['100 item object defProp ref'] = record(10000, () => fill(100, new Object(), objDef));
results['1000 item object defProp ref'] = record(1000, () => fill(1000, new Object(), objDef));

let shared = {};

function objShared(obj, i) {
  obj[i] = shared;
}

results['10 item object shared obj'] = record(100000, () => fill(10, new Object(), objShared));
results['100 item object shared obj'] = record(10000, () => fill(100, new Object(), objShared));
results['1000 item object shared obj'] = record(1000, () => fill(1000, new Object(), objShared));

function arrMixed(arr, i) {
  switch (i % 4) {
    case 0: return arr[i] = 0
    case 1: return arr[i] = ""
    case 2: return arr[i] = {}
    case 3: return arr[i] = []
  }
}

results['10 item arr mixed'] = record(100000, () => fill(10, new Array(), arrMixed));
results['100 item arr mixed'] = record(10000, () => fill(100, new Array(), arrMixed));
results['1000 item arr mixed'] = record(1000, () => fill(1000, new Array(), arrMixed));

console.log(results);
