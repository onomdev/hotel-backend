const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const errorHandlerMiddleware = require("./api/src/middleware/error_handler");
const notFoundMiddleware = require("./api/src/middleware/not_found");
const mongoose = require("mongoose");
const user = require("./api/routes/user_routes");
const room = require("./api/routes/room_routes");
const admin = require("./api/routes/admin_routes");

mongoose.connect(
  "mongodb+srv://rei:pussyhunter69@cluster0.asmfs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(`/uploads/menu-items`, express.static("uploads"));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api/v1/development", user);
app.use("/api/v1/development", room);
app.use("/api/v1/development", admin);
// app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => console.log(`Listen on port ${port}`));
