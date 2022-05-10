const mysql = require('mysql');
const sql = require("mssql");
const env = require('../node_modules/dotenv').config({ path: '../.env' });
let connection  = mysql.createConnection({
        connectionLimit : 10,
        host            : env.hostMysqlGD,
        user            : env.userMysqlGD,
        password        : env.passwordMysqlGD,
        database        : env.databaseMysqlGD,
        charset         : env.charsetMysqlGD
});  

let connectionsubastas  = mysql.createConnection({
  connectionLimit : 10,
  host            : env.hostMysqlSUB,
  user            : env.userMysqlSUB,
  password        : env.passwordMysqlSUB,
  database        : env.databaseMysqlSUB,
  charset         : env.charsetMysqlSUB
});

module.exports = {
 connection,
 connectionsubastas
}