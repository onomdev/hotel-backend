const { conn } = require("../../../config/db_config");

class ArchiveJobs {
  getArchiveJobs(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from ${req.params.clientName}_archive ORDER BY id DESC`,
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (!err) {
            res.send(rows);
          } else {
            res.json({
              status: false,
              msg: `Something wrong happened.`,
            });
          }
        }
      );
    });
  }

  deleteArchiveItemJobs(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `DELETE from ${req.params.clientName}_archive WHERE id = ?`,
        [req.params.id],
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (!err) {
            res.json({
              status: "ok",
              msg: `Archive item with the Record ID: ${[
                req.params.id,
              ]} has been removed.`,
            });
          } else {
            res.json({
              status: false,
              msg: `Archive item with the Record ID: ${[
                req.params.id,
              ]} failed to be removed.`,
            });
          }
        }
      );
    });
  }

  purgeArchiveJobs(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `DELETE from ${req.params.clientName}_archive`,
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (!err) {
            res.json({
              status: "ok",
              msg: `Archive has been purged! NO GOING BACK!!`,
            });
          } else {
            res.json({
              status: "ok",
              msg: `Archive has failed to be purged!`,
            });
          }
        }
      );
    });
  }
}

module.exports = ArchiveJobs;
