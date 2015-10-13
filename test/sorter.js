"use strict";
const assert = require('assert');
const koa = require('koa');
const request = require('superagent');
const http = require('http');
const koaQuerySorter = require('../lib/sorter');

describe('koa-query-sorter', function () {
  it('should set query sorter successful', function (done) {
    let app = koa();
    app.use(koaQuerySorter());
    app.use(function* (next) {
      assert.equal(this.originalUrl, '/?a=2&c=3&d=4&g=1');
      yield * next;
    });
    let port = process.env.PORT || 10000;
    let httpServer = http.createServer(app.callback()).listen(port);
    console.info('server listen on:' + port);
    let url = 'http://localhost:' + port + '/?g=1&c=3&a=2&d=4';
    request.get(url).end(function (err,
      res) {
      done();
      httpServer.close();
    });
  });
});
