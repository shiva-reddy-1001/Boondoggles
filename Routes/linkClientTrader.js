
const express = require("express");
const router = express.Router();

const {addLink,getAllTraders,getAllClients,getLinks} = require("../Controllers/linkClientTrader")
const auth = require("../middleware/auth")

router.post("/addLink", auth, addLink);
router.get("/getAllTraders", getAllTraders);
router.get("/getAllClients", getAllClients);
router.get("/getLinksOfUser", auth, getLinks);

module.exports = router;