'use strict';

const sqlite3 = require('sqlite3').verbose();
const config = require('config');
const path = require('path');


const db = new sqlite3.Database(path.join(config.root, 'db', 'deskbookers.db'));
module.exports = db;