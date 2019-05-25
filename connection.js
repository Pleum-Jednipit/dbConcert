var mysql = require("mysql");

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'concert',

});

module.exports = connection;