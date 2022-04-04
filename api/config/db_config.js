const mysql = require("mysql");

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotels",
  connectionLimit: 50,
  multipleStatements: true
});


module.exports = {
  conn,
};
