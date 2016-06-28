'use strict';

const views = require('koa-views');
const config = require('config');
const path = require('path');

module.exports = views(path.join(config.root, 'templates'), {
  default: 'jade'
});

