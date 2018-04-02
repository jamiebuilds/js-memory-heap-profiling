# js-memory-heap-profiling

```sh
yarn install
yarn start
```

**Results: (Node v8.0.0)**

```
|                           kind | total/n    |          n |      total |
-------------------------------------------------------------------------
|                         number | 0.002016 B |    1000000 |    2.02 kB |
|                   empty string | 0.004208 B |    1000000 |    4.21 kB |
|                           true | 0.016664 B |    1000000 |    16.7 kB |
|                   empty object | 0.018336 B |    1000000 |    18.3 kB |
|                    empty array | 0.019288 B |    1000000 |    19.3 kB |
|                      empty map | 0.017456 B |    1000000 |    17.5 kB |
|                      empty set | 0.01692 B  |    1000000 |    16.9 kB |
|                  empty weakmap | 0.018056 B |    1000000 |    18.1 kB |
|                  empty weakset | 0.019 B    |    1000000 |      19 kB |
|            Object.create(null) | 0.017112 B |    1000000 |    17.1 kB |
|                 10 item object | 0.2052 B   |     100000 |    20.5 kB |
|                  10 item array | 242 B      |     100000 |    24.2 MB |
|                    10 item map | 530 B      |     100000 |      53 MB |
|                    10 item set | 402 B      |     100000 |    40.2 MB |
|                100 item object | 1.2 kB     |      10000 |      12 MB |
|                 100 item array | 1.34 kB    |      10000 |    13.4 MB |
|                   100 item map | 3.67 kB    |      10000 |    36.7 MB |
|                   100 item set | 2.64 kB    |      10000 |    26.4 MB |
|               1000 item object | 10.4 kB    |       1000 |    10.4 MB |
|                1000 item array | 11.6 kB    |       1000 |    11.6 MB |
|                  1000 item map | 28.8 kB    |       1000 |    28.8 MB |
|                  1000 item set | 20.6 kB    |       1000 |    20.6 MB |
|         10 item object defProp | 738 B      |     100000 |    73.8 MB |
|        100 item object defProp | 8.66 kB    |      10000 |    86.6 MB |
|       1000 item object defProp | 73.3 kB    |       1000 |    73.3 MB |
|     10 item object defProp ref | 738 B      |     100000 |    73.8 MB |
|    100 item object defProp ref | 8.66 kB    |      10000 |    86.6 MB |
|   1000 item object defProp ref | 73.3 kB    |       1000 |    73.3 MB |
|      10 item object shared obj | 218 B      |     100000 |    21.8 MB |
|     100 item object shared obj | 1.2 kB     |      10000 |      12 MB |
|    1000 item object shared obj | 10.4 kB    |       1000 |    10.4 MB |
|              10 item arr mixed | 418 B      |     100000 |    41.8 MB |
|             100 item arr mixed | 3.54 kB    |      10000 |    35.4 MB |
|            1000 item arr mixed | 33.6 kB    |       1000 |    33.6 MB |
```
