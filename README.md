# js-memory-heap-profiling

```sh
yarn install
yarn start
```

**Results: (Node v8.0.0)**

```js
{ number: 11.358744,
  'empty string': 11.63708,
  true: 11.637,
  'empty object': 67.639432,
  'empty array': 91.636936,
  'empty map': 195.637488,
  'empty set': 163.638512,
  '10 item object': 218.30232,
  '10 item array': 242.26208,
  '10 item map': 530.53072,
  '10 item set': 402.46528,
  '100 item object': 1201.3136,
  '100 item array': 1337.2456,
  '100 item map': 3665.1808,
  '100 item set': 2641.2072,
  '1000 item object': 10398.224,
  '1000 item array': 11598.584,
  '1000 item map': 28758.464,
  '1000 item set': 20566.2,
  '10 item object defProp': 746.27536,
  '100 item object defProp': 8665.2336,
  '1000 item object defProp': 122429.488,
  '10 item object defProp ref': 746.25072,
  '100 item object defProp ref': 8665.2288,
  '1000 item object defProp ref': 122429.536,
  '10 item object shared obj': 218.26168,
  '100 item object shared obj': 1201.2096,
  '1000 item object shared obj': 10398.2,
  '10 item arr mixed': 418.61456,
  '100 item arr mixed': 3538.78,
  '1000 item arr mixed': 33602.44 }
```
