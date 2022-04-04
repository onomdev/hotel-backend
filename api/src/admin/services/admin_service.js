const { conn } = require("../../../config/db_config");
class AdminService {
  getAllClients(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(`SELECT * from clients`, (err, rows) => {
        connection.release();
        if (!err) {
          res.json({ rows });
        } else {
          res.json({ message: err.message });
        }
      });
    });
  }

  getClient(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from clients WHERE id = ?`,
        [req.params.id],
        (err, rows) => {
          connection.release();
          if (!err) {
            res.json({ rows });
          } else {
            res.status(500).json({ message: err.message });
          }
        }
      );
    });
  }

  adminLogIn(req, res) {}

  adminSignUp(req, res) {}

  getClientData(req, res) {}

  banClient(req, res) {}
}

module.exports = AdminService;
