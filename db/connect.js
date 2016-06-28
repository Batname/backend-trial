'use strict';

const sqlite3 = require('sqlite3').verbose();
const config = require('config');
const path = require('path');



module.exports = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(path.join(config.root, 'db', 'deskbookers.db'), errCalback);

    function errCalback (err) { err && reject(err); }
    db.on('open', () => resolve(db));
  });
}