const express = require("express");
const router = express.Router();

const {addNewChat, addMessage} = require("../Controllers/Chats");
const auth = require("../middleware/auth")

router.post("/addNewChat", auth, addNewChat);
router.post("/addMessage", auth, addMessage);


module.exports = router;