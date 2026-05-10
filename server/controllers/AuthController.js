const User = require("../model/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

module.exports.Signup = async (req, res, next) => {
  try {
    console.log(">>> [BACKEND] Signup Request Received:", req.body.email);
    const { email, password, username, createdAt } = req.body;
    
    console.log(">>> [BACKEND] Checking for existing user...");
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log(">>> [BACKEND] User already exists.");
      return res.json({ message: "User already exists" });
    }
    
    console.log(">>> [BACKEND] Creating new user...");
    const user = await User.create({ email, password, username, createdAt });
    
    console.log(">>> [BACKEND] Signing JWT token...");
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    console.log(">>> [BACKEND] Signup Successful!");
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(">>> [BACKEND] SIGNUP ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    console.log(">>> [BACKEND] Login Request Received:", req.body.email);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    console.log(">>> [BACKEND] Finding user...");
    const user = await User.findOne({ email });
    if (!user) {
      console.log(">>> [BACKEND] User not found.");
      return res.json({ message: "Incorrect password or email" });
    }
    console.log(">>> [BACKEND] Comparing passwords...");
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      console.log(">>> [BACKEND] Password mismatch.");
      return res.json({ message: "Incorrect password or email" });
    }
    console.log(">>> [BACKEND] Signing JWT token...");
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: 3 * 24 * 60 * 60,
    });
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    console.log(">>> [BACKEND] Login Successful!");
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(">>> [BACKEND] LOGIN ERROR:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports.Logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/"
  });
  res.status(200).json({ message: "Logged out successfully", success: true });
};

module.exports.GetUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ status: false });
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.json({ status: false });
    const user = await User.findById(data.id);
    if (user) res.json({ status: true, user: user.username });
    else res.json({ status: false });
  });
};
