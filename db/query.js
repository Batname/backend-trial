'use strict';

const fs = require('fs');
const path = require('path');

exports.each = (db, options) => {
  return new Promise((resolve, reject) => {

    let rows = [];

    function complete () {
      resolve(rows);
    }

    function eachCb (err, row){
      if (err) reject(err);
      rows.push(row);
    }

    if (options.file) {
      fs.readFile(path.join(__dirname, 'fixture', options.file), (error, data) => {
        error && reject(error);
        db.each(data.toString(), eachCb, complete);
      });
    } else if (options.string) {
      db.each(options.string, eachCb, complete);
    } else {
      reject('you should specify file or sql string');
    }

  });
};