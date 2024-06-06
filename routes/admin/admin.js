const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");


router.post("/admin",adminController.admin)

module.exports = router;