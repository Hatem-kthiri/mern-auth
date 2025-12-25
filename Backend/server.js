const express = require("express");
const connectDb = require("./config/connectDb");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
require("dotenv").config();
const PORT = 3001;
connectDb();

app.use("/api/user", require("./Routes/user"));
app.listen(PORT, () => {
  console.log(`server running on PORT 3001 at http://localhost:3001`);
});

app.get("/", (req, res) => {
  res.send("Hello from Backend Server");
});
