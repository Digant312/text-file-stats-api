const express = require("express");

const fileController = require("../controllers/fileController");

const router = express.Router();

router.post("/stats", fileController.statistics);

module.exports = router;
