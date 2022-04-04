const bcrypt = require("bcrypt");
const { conn } = require("../../../config/db_config");

class RoomService {  
  async registerRoomService(req, res) {
    const { roomName, password: plainTextPassword } = req.body;
    if (!roomName || typeof roomName !== "string") {
      return res.json({ status: "error", error: "Invalid roomName" });
    }

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
      return res.json({ status: "error", error: "Invalid password" });
    }
    if (plainTextPassword.length < 5) {
      return res.json({
        status: "error",
        error: "Password too small. Should be atleast 6 characters",
      });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    const body = {
      roomName: req.body.roomName,
      password: password,
    };

    try {
      conn.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
        connection.query(
          `INSERT INTO ${req.params.clientName}_rooms SET ?`,
          body,
          (err, rows) => {
            connection.release(); // return the connection to pool
            if (!err) {
              res.json({ status: "ok", msg: "Room created succesfully" });
            } else {
              console.log(err);
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  getAllRoomsService(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from ${req.params.clientName}_rooms ORDER BY id DESC`,
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (!err) {
            res.send(rows);
          } else {
            console.log(err);
          }
        }
      );
    });
  }

  async loginRoomService(req, res) {
    const { roomName, password } = req.body;
    const room = conn.getConnection(async (err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from ${req.params.clientName}_rooms WHERE roomName = ?`,
        req.body.roomName,
        async (err, rows) => {
          // console.log(rows[0].password);
          if (await bcrypt.compare(password, rows[0].password)) {
            // the username, password combination is successful
            return res.json({ status: "ok" });
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
}

module.exports = RoomService;
