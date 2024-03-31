const User = require("../models/userRegistration");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyadmin = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json("not found");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    //console.log(req);
    console.log(verified);
    req.user = verified;
    if (verified.role == "admin") {
      console.log("admin Dashboard");
      next();
    } else {
      res.status(401).json("not a authorised user");
    }
  } catch (error) {
    res.status(401).json("error occured");
  }
};
const verifyowner = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verified;
    if (verified.role == "owner") {
      console.log("Owner Dashboard");
      next();
    } else {
      res.status(401).json("not a authorised user");
    }
  } catch (error) {
    res.status(401).json("error occured");
  }
};
const verifyuser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verified;
    console.log("user Dashboard",verified);
    res.json(verified);
    next();
  } catch (error) {
    res.status(401).json("error occured");
  }
};

module.exports = { verifyadmin, verifyowner, verifyuser };
