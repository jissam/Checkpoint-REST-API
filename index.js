const connectDB = require("./config/database");
const express = require("express");
const user = require("./models/user");
const userRoute = require("./routes/userroute");
require("dotenv").config();

const server = express();
connectDB();

server.use(express.json());

server.use("/user", userRoute);

//run server
server.listen(8000, () => {
  console.log("aaaaaa");
});

console.log(user);
