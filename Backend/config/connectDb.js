const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connection to database Ok :) "))
    .catch((err) => console.log(err));
};

module.exports = connectDb;
