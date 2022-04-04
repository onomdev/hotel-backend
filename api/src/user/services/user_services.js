const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { conn } = require("../../../config/db_config");
const format = require("date-format"); 
const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

class UserServices {
  async loginClientService(req, res) {
    const { clientName, password } = req.body;
    conn.getConnection(async (err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from clients WHERE client_name = ?`,
        req.body.clientName,
        async (err, rows) => {
          if (await bcrypt.compare(password, rows[0].client_password)) {
            // the username, password combination is successful
            const token = jwt.sign(
              {
                id: rows[0].id,
                clientName: rows[0].client_name,
              },
              JWT_SECRET
            );
            return res.json({ status: "ok", data: token });
          } else {
            return res.json({
              status: "error",
              error: "Invalid username/password",
            });
          }
        }
      );
    });
  }

  async registerClientService(req, res) {
    const date = format("yyyy-MM-dd-hh-mm", new Date());
    const password = await bcrypt.hash(req.body.client_password, 10);
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);

      const params = {
        client_name: req.body.clientName,
        client_password: password,
        client_email: req.body.clientEmail,
        phone_number: req.body.phoneNumber,
        created_at: date,
        client_data_table_name: req.body.clientName + "_data",
        client_order_table_name: req.body.clientName + "_orders",
        client_archive_table_name: req.body.clientName + "_archive",
        client_room_table_name: req.body.clientName + "_rooms",
      };

      connection.query(
        `CREATE TABLE IF NOT EXISTS ${params.client_name}_data (id INT NOT NULL AUTO_INCREMENT , PRIMARY KEY (id), item_name VARCHAR(255), item_description VARCHAR(255), item_price VARCHAR(255), item_image VARCHAR(255)); 
        CREATE TABLE IF NOT EXISTS ${params.client_name}_archive (id INT NOT NULL AUTO_INCREMENT , PRIMARY KEY (id), items TEXT(500), room_number VARCHAR(255), date VARCHAR(255)); 
        CREATE TABLE IF NOT EXISTS ${params.client_name}_orders (id INT NOT NULL AUTO_INCREMENT , PRIMARY KEY (id), items TEXT(500), room_number VARCHAR(255), date VARCHAR(255)); 
        CREATE TABLE IF NOT EXISTS ${params.client_name}_rooms (id INT NOT NULL AUTO_INCREMENT , PRIMARY KEY (id), roomName VARCHAR(255), password VARCHAR(255)); 
        CREATE TABLE IF NOT EXISTS ${params.client_name}_reservations (id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), room_number VARCHAR(255), start_date VARCHAR(255), end_date VARCHAR(255), price VARCHAR(255), details TEXT(500));
        INSERT INTO clients SET ?
      `,
        params,
        (err, rows) => {
          if (!err) {
            const token = jwt.sign(
              {
                clientName: params.client_name,
              },
              JWT_SECRET
            );
            res.json({ status: "ok", token: token });
          } else {
            console.log(err);
          }
        }
      );
    });
  }
 
  async findOneUser(req, res, next) {
    conn.getConnection(async (err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from clients WHERE client_name = ?`,
        req.body.clientName,
        async (err, rows) => {
          if (rows.length > 0) {
            res.json({ message: "User with this username already exists" });
          } else {
            next();
          }
        }
      );
    });
  }
}

module.exports = UserServices;
