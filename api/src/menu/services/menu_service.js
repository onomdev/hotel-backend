const { conn } = require("../../../config/db_config");
class MenuService {
  deleteMenuItemService(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
 
      connection.query(
        `DELETE from ${req.params.clientName}_data WHERE id = ?`,
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
            console.log(err);
          }
        }
      );
    });
  }

  populateMenu(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);

      const body = {
        item_name: req.body.item_name,
        item_description: req.body.item_description,
        item_price: req.body.item_price,
        item_image: req.file.filename,
      };

      const clientName = req.params.clientName;

      connection.query(
        `INSERT INTO ${clientName}_data SET ?`,
        body,
        (err, rows) => {
          connection.release(); // return the connection to pool
          if (!err) {
            res.send(
              `Menu item with the name: ${body.item_name} has been added.`
            );
          } else {
            console.log(err);
          }
        }
      );

      console.log(req.body);
    });
  }

  getMenuItemByIdService(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);

      connection.query(
        `SELECT * from ${req.params.clientName}_data WHERE id = ?`,
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

  getAllMenuItemsService(req, res) {
    conn.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      connection.query(
        `SELECT * from ${req.params.clientName}_data ORDER BY id DESC`,
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
}

module.exports = MenuService;
