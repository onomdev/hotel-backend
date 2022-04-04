const { checkToken } = require("../../middleware/authentication");
const OrderService = require("../services/order_service");
const orderService = new OrderService();

const getAllOrders = (req, res) => {
  try {
    checkToken(req, res, () => orderService.getAllOrdersService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const getOrderById = (req, res) => {
  try {
    checkToken(req, res, () => orderService.getOrderByIdService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const deleteOrderById = (req, res) => {
  try {
    checkToken(req, res, () => orderService.deleteOrderByIdService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const createOrder = (req, res) => {
  try {
    checkToken(req, res, () => orderService.createOrder(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  createOrder,
};
