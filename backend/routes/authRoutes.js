const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getUser", getUser);

module.exports = router;
