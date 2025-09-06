const express = require("express");
const { getGeoInfo } = require("../controllers/homecontroller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/home", authMiddleware, getGeoInfo);

module.exports = router;