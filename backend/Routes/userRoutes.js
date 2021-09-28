const express = require("express");
const { authUser, registerUser, verifyUser } = require("../Controller/userController");
const protect = require('../middleware/authMiddleware')
const router = express();

router.post("/login", authUser);
router.post("/register", registerUser);
router.get("/verify", protect, verifyUser);
module.exports = router;
