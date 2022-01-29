const express = require("express");
const router = express.Router();

const {register,verify,login} = require("../controllers/LoginRegister");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/verify", auth, verify);

// router.post("/resetPassword", auth, resetPassword); // write code in frontend
// router.post("/forgotPassword", auth, forgotPassword); // write code in frontend

module.exports = router;