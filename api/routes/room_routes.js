const express = require("express");
const router = express.Router();

const {
  loginRoomMySql,
  registerRoomMySql,
  getAllRoomsMySql,
} = require("../src/rooms/controllers/room_controller");

//room auth routes
router.route("/room/login/:clientName").post(loginRoomMySql);
router.route("/room/register/:clientName").post(registerRoomMySql);
router.route("/room/get-rooms/:clientName").get(getAllRoomsMySql);

module.exports = router;
