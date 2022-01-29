const express = require("express");
const router = express.Router();

const {analyzeText,getQuote} =require("../controllers/nerAzure");
const auth = require("../middleware/auth");

router.post("/azure/analyse", auth, analyzeText);
router.get("/scrape/quote", getQuote);

module.exports = router;