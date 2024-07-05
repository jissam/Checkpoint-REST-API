// Import mongoose
const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then((data) => {
      //esm databases
      console.log("connected to Database");
    })
    .catch(() => {
      console.log("error");
      process.exit(1);
    });
}

module.exports = connectDB;
