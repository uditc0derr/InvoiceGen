const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController");
const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Get all users
router.get("/", getAllUsers);

module.exports = router;
