const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // res.cookie('token', token)

    // res.json({
    //     message: 'Login Successfull'
    // })

    return res.json({
      token,
      message: "Successfully signed in",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.signup = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  try {
    if (!username || !password || !firstName || !lastName || !email) {
      return res.status(404).json({
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ username });

    if (user) {
      return res.status(404).json({
        message: "Username already exist",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
    });

    return res.json({
      message: "User registerd successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.signout = async (req, res) => {
  res.clearCookie("token");
  return res.json({
    message: "Logout Successfull",
  });
};

exports.fetchuser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.json({
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
