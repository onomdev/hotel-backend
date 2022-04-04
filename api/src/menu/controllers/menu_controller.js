const { checkToken } = require("../../middleware/authentication");
const MenuService = require("../services/menu_service");
const menuService = new MenuService();

const deleteMenuItemById = (req, res) => {
  try { 
    checkToken(req, res, () => menuService.deleteMenuItemService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const getMenuItemById = (req, res) => {
  try {
    checkToken(req, res, () => menuService.getMenuItemByIdService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const getAllMenuItems = (req, res) => {
  try {
    checkToken(req, res, () => menuService.getAllMenuItemsService(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const populateMenu = (req, res) => {
  try {
    checkToken(req, res, () => menuService.populateMenu(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

module.exports = {
  deleteMenuItemById,
  getMenuItemById,
  getAllMenuItems,
  populateMenu,
};
