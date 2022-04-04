const AdminService = require("../services/admin_service");
const adminService = new AdminService();
const { checkKey } = require("../../middleware/apiKey");

const adminLogIn = (req, res) => {
  try {
  } catch (error) {}
};

const adminSignUp = (req, res) => {
  try {
  } catch (error) {}
};

const getAllClients = (req, res) => {
  try {
    checkKey(req, res, () => adminService.getAllClients(req, res));
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getClient = (req, res) => {
  try {
    checkKey(req, res, () => adminService.getClient(req, res));
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getClientData = (req, res) => {
  try {
  } catch (error) {}
};

const banClient = (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  getAllClients,
  getClient,
};
