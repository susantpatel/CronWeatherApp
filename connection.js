var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'weatherappcron',
});

connection.connect((err) => {
  if (!err) {
    console.log('connected');
  } else {
    console.log(err);
  }
});

module.exports = connection;
