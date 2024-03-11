const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'DuyKhanh2002',
  password: '03112002',
  database: 'badminton',
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;
