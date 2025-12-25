const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const Route = express.Router();
const jwt = require("jsonwebtoken");
Route.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.status(409).json({ message: "Email Already Exist !! " });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          if (err) throw err;
          bcrypt.hash(password, salt, async (err, cryptedPassword) => {
            if (err) throw err;
            await User.create({
              fullName,
              email,
              password: cryptedPassword,
            });
            res.status(201).json({ message: "User created Successfully" });
          });
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

Route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) throw err;
          if (result) {
            jwt.sign(
              { fullName: user.fullName, email: user.email },
              process.env.SECRET_KEY,
              {
                expiresIn: "7d",
              },
              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  message: "account Logged In Ok ",
                  data: token,
                });
              }
            );
          } else {
            res.status(401).json({ message: "Password incorrect" });
          }
        });
      } else {
        res.status(404).json({ message: "Email Not Found !" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = Route;
