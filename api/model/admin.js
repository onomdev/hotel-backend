const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { collection: "admin" }
);

const model = mongoose.model("AdminSchema", AdminSchema);

module.exports = model;
