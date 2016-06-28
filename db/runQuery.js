'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (connection, options) => {
  return new Promise((resolve, reject) => {

    function runQuery(queryString) {
      connection.query(queryString, (err, rows) => {
        if (err) reject(err);
        
        resolve(rows);
      });

    }

    if (options.file) {
      fs.readFile(path.join(__dirname, 'fixture', options.file), (error, data) => {
        error && reject(error);
        runQuery(data.toString());
      });
    } else if (options.string) {
      runQuery(options.string);
    } else {
      reject('you should specify file or sql string');
    }

  });
};