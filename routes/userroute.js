const express = require("express");
const {
  getAllusers,
  adduser,
  deleteuser,
  activeuser,
  login,
} = require("../controllers/userControllers");

const userRoute = express.Router();

userRoute.get("/allusers", getAllusers);
userRoute.post("/add", adduser);
userRoute.put("/active/:idselect", activeuser);
userRoute.delete("/delete/:iddelete", deleteuser);
userRoute.post("/login", login);

module.exports = userRoute;
