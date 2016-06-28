'use strict';

const mysql = require('mysql');
const config = require('config');
const connection = mysql.createConnection(config.dbConfig);
 
connection.connect();

module.exports = connection;