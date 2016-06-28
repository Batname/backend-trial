'use strict';

const koa = require('koa');
const app = koa();
const config = require('config');
const path = require('path');
const fs = require('fs');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
const co = require('co');
const connect = require('./db/connect');
const query = require('./db/query');

co(function* () {
  let db = yield connect();
  let rows = yield query.each(db, {string: 'SELECT * FROM users'});
  db.close();
  console.log(rows);
}).catch(err => console.log(err.message))


middlewares.forEach(middleware => app.use(require('./middlewares/' + middleware)));

app.use(function* (next) {
  yield this.render('index.jade', {
    user: 'bat'
  });
});

app.listen(config.port, console.log.bind(null, `The server run in port ${config.port}`));