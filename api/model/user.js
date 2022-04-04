const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    password: { type: String, required: true },
    clientEmail: { type: String, required: true },
  },
  { collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
