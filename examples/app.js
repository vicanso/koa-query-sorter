'use strict';
const koa = require('koa');
const app = koa();
const koaQuerySorter = require('../lib/sorter');

app.use(function* (next) {
  console.dir(this.originalUrl);
  yield * next;
});
app.use(koaQuerySorter());
app.use(function* (next) {
  console.dir(this.originalUrl);
  yield * next;
});

var port = process.env.PORT || 10000;
app.listen(port);
console.dir('server listen on:' + port);
