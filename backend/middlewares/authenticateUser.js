const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  try {
    // const token = req.cookies.token
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.json({
        message: "Unauthorized",
      });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = authenticateUser;
