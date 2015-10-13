'use strict';
const _ = require('lodash');
const debug = require('debug')('jt.koa-query-sort');
const querystring = require('querystring');
module.exports = sorter;

/**
 * [sorter description]
 * @param  {[type]} order [description]
 * @return {[type]}       [description]
 */
function sorter(order) {
  order = order || 'asc';
  return function* (next) {
    let ctx = this;
    let query = ctx.query;
    if (!_.isEmpty(query)) {
      query = sortObject(query, order);
      ctx.query = query;
      ctx.originalUrl = ctx.url = ctx.path + '?' + querystring.stringify(
        query);
    }
    yield * next;
  };
}

/**
 * [sortObject description]
 * @param  {[type]} obj   [description]
 * @param  {[type]} order [description]
 * @return {[type]}       [description]
 */
function sortObject(obj, order) {
  order = order /* istanbul ignore next  */ || 'asc';
  let keys = _.keys(obj).sort();
  /* istanbul ignore if  */
  if (order !== 'asc') {
    keys.reverse();
  }
  let tmp = {};
  _.forEach(keys, function (key) {
    tmp[key] = obj[key];
  });
  return tmp;
}
