const { checkToken } = require("../../middleware/authentication");
const RoomService = require("../services/room_service");
const roomService = new RoomService();

const loginRoomMySql = async (req, res) => {
  try {
    checkToken(req, res, () => roomService.loginRoomService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const registerRoomMySql = (req, res) => {
  try {
    checkToken(req, res, () => roomService.registerRoomService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is Invalid",
    });
  }
};

const getAllRoomsMySql = (req, res) => {
  try {
    checkToken(req, res, () => roomService.getAllRoomsService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

module.exports = {
  loginRoomMySql,
  registerRoomMySql,
  getAllRoomsMySql,
};
