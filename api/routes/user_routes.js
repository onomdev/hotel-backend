const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const {
  registerClientInMySql,
  loginClientMySql,
} = require("../src/user/controllers/user_controller");

const {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  createOrder,
} = require("../src/orders/controllers/order_controller");

const {
  getArchive,
  deleteArchiveItem,
  purgeArchive,
} = require("../src/archive/controllers/archive_controller");

const {
  deleteMenuItemById,
  getMenuItemById,
  getAllMenuItems,
  populateMenu,
} = require("../src/menu/controllers/menu_controller");

const {
  getAllReservations,
  createReservation,
  getSingleRoomReservations,
  deleteReservation,
} = require("../src/reservations/controllers/reservations_controller");

//authenticating and creating databases
router.route("/client/login-client").post(loginClientMySql);
// router.route("/client/register-client").post(registerClient);
router.route("/client/create-database").post(registerClientInMySql);

// menu item routes
router.route("/client/get-all-menu-items/:clientName").get(getAllMenuItems);
router
  .route("/client/menu-item-by-id/:id/:clientName")
  .get(getMenuItemById)
  .delete(deleteMenuItemById);
router
  .route("/client/add-menu-item/:clientName")
  .post(upload.single("item_image"), populateMenu);

//order routes
router.route("/client/get-all-orders/:clientName").get(getAllOrders);
router.route("/client/create-order/:clientName").post(createOrder);
router
  .route("/client/order-by-id/:id/:clientName")
  .get(getOrderById)
  .delete(deleteOrderById);

//archive routes
router.route("/client/get-archive/:clientName").get(getArchive);
router.route("/client/purge-archive/:clientName").delete(purgeArchive);
router
  .route("/client/delete-archive-item-by-id/:id/:clientName")
  .delete(deleteArchiveItem);

// reservation routes
router.route("/client/create-reservation/:clientName").post(createReservation);
router
  .route("/client/get-all-reservations/:clientName")
  .get(getAllReservations);
router
  .route("/client/get-single-room-reservations/:clientName/:roomNumber")
  .get(getSingleRoomReservations);
router
  .route("/client/delete-reservation/:clientName/:id")
  .delete(deleteReservation);
module.exports = router;
