const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register Owner
const registerUser = async (req, res) => {
  const { name, email, password, businessName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, businessName });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      businessName: user.businessName,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login Owner
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      businessName: user.businessName,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); 
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
