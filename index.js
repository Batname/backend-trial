'use strict';

const koa = require('koa');
const app = koa();
const config = require('config');
const path = require('path');
const fs = require('fs');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(middleware => app.use(require('./middlewares/' + middleware)));

app.use(function* (next) {
  yield this.render('index.jade', {
    user: 'bat'
  });
});

app.listen(config.port, console.log.bind(null, `The server run in port ${config.port}`));