# query sorter middlware for koa

## Installation

```bash
$ npm install koa-query-sorter
```

## API

```js
var koa = require('koa');
var koaQuerySorter = require('koa-query-sorter');
app.use(function* (next) {
  console.info(this.originalUrl);
  yield * next;
});
app.use(koaQuerySorter('desc'));
app.use(function* (next) {
  console.info(this.originalUrl);
  yield * next;
});
```

### param

sort order, eg: 'asc' or 'desc'


## License

MIT
