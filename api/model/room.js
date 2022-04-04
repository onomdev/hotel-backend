const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "rooms" }
);

const model = mongoose.model("RoomSchema", RoomSchema);

module.exports = model;