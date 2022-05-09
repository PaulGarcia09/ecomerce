const mysql = require('mysql');
const sql = require("mssql");
let connection  = mysql.createConnection({
        connectionLimit : 10,
        host            : '198.12.231.45',
        user            : 'maxilanabd',
        password        : 'Cuitlahuac9607',
        database        : 'maxilanabd',
        charset         : 'utf8'
});  
let connectionsubastas  = mysql.createConnection({
  connectionLimit : 10,
  host            : '174.136.28.68',
  user            : 'erick',
  password        : 'erick2021',
  database        : 'abroadcaster',
  charset         : 'utf8'
});
let sqlconnection = new sql.ConnectionPool({
  user: 'sa',
  password: 'napire960702',
  server: '10.0.0.232', 
  database: 'Subastas' 
});
module.exports = {
 connection,
 sqlconnection,
 connectionsubastas
}