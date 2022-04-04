const express = require("express");
const router = express.Router();

const { getAllClients, getClient } = require("../src/admin/controllers/admin_controller");

router.route("/admin/get-all-clients").get(getAllClients);
router.route("/admin/get-client/:id").get(getClient);

module.exports = router;
