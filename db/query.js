'use strict';

const fs = require('fs');
const path = require('path');

exports.get = (db, queryString) => {
  return new Promise((resolve, reject) => {

    function callback (err, rows){
      if (err) reject(err);
      resolve(rows);
    }

    db.get(queryString, callback);

  });
};

exports.each = (db, queryString) => {
  return new Promise((resolve, reject) => {

    let rows = [];

    function complete () {
      resolve(rows);
    }

    function eachCb (err, row){
      if (err) reject(err);
      rows.push(row);
    }

    db.each(queryString, eachCb, complete);

  });
};