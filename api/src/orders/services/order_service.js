const { conn } = require("../../../config/db_config");
const format = require("date-format");

class OrderService {
  getAllOrdersService(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from ${req.params.clientName}_orders ORDER BY id DESC`,
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

  getOrderByIdService(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);

      connection.query(
        `SELECT * from ${req.params.clientName}_orders WHERE id = ?`,
        [req.params.id],
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

  deleteOrderByIdService(req, res) {
    try {
      conn.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
        connection.query(
          `SELECT * from ${req.params.clientName}_orders WHERE id = ?`,
          [req.params.id],
          (err, rows) => {
            if (err) {
              res.send("Failed to get order");
            } else {
              connection.query(
                `INSERT INTO ${req.params.clientName}_archive SET ?`,
                rows,
                (err, rows) => {
                  if (err) {
                    res.send(
                      "Failed to push deleted order to archive, try again"
                    );
                  } else {
                    console.log(rows);
                  }
                }
              );
            }
          }
        );
      });
    } catch (error) {
      res.json({
        status: false,
        msg: err.message,
      });
    } finally {
      conn.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query(
          `DELETE from ${req.params.clientName}_orders WHERE id = ?`,
          [req.params.id],
          (err, rows) => {
            connection.release(); // return the connection to pool

            if (!err) {
              res.send(
                `Menu item with the Record ID: ${[
                  req.params.id,
                ]} has been removed.`
              );
            } else {
              res.json({
                status: false,
                msg: err.message,
              });
            }
          }
        );
      });
    }
  }

  createOrder(req, res) {
    const date = format("yyyy-MM-dd-hh-mm", new Date());
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);

      const body = {
        items: req.body.items,
        room_number: req.body.room_number,
        date: date,
      };

      const clientName = req.params.clientName;

      connection.query(
        `INSERT INTO ${clientName}_orders SET ?`,
        body,
        (err, rows) => {
          connection.release();
          if (!err) {
            res.send(`Order with the name: ${body.items} has been added.`);
          } else {
            console.log(err);
          }
        }
      );
      console.log(req.body);
    });
  }
}

module.exports = OrderService;
