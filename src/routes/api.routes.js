const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api.controller.js");

router.get("/randomAPI/credit_cards/:size", apiController.getCreditCards);

module.exports = router;