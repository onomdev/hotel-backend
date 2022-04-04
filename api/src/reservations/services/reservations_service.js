const { conn } = require("../../../config/db_config");

class ReservationsService {
  createReservation(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      const body = {
        room_number: req.body.room_number,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        price: req.body.price,
        details: req.body.details,
      };

      const clientName = req.params.clientName;

      connection.query(
        `INSERT INTO ${clientName}_reservations SET ?`,
        body,
        (err, rows) => {
          if (!err) {
            res.json({
              status: true,
              message: `Reservation has been added.`,
            });
          } else {
            res.json({
              status: false,
              message: err.message,
            });
          }
        }
      );
    });
  }

  getAllReservations(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from ${req.params.clientName}_reservations ORDER BY id DESC`,
        (err, rows) => {
          if (!err) {
            res.json({ rows });
          } else {
            res.json({ status: false, message: "Failed to get reservations" });
          }
        }
      );
    });
  }

  getSingleRoomReservation(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);

      connection.query(
        `SELECT * from ${req.params.clientName}_reservations WHERE room_number = ?`,
        [req.params.roomNumber],
        (err, rows) => {
          if (!err) {
            res.json({ rows });
          } else {
            res.json({ status: false, message: "Failed to get reservations" });
          }
        }
      );
    });
  }

  deleteReservation(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `DELETE from ${req.params.clientName}_reservations WHERE id = ?`,
        [req.params.id],
        (err, rows) => {
          if (!err) {
            res.json({
              status: true,
              msg: `Reservation with the Record ID: ${[
                req.params.id,
              ]} has been removed.`,
            });
          } else {
            res.json({
              status: false,
              msg: `Reservation with the Record ID: ${[
                req.params.id,
              ]} failed to be removed.`,
            });
          }
        }
      );
    });
  }
}

module.exports = ReservationsService;
