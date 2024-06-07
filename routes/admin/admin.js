const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");


router.post("/",adminController.adminsignup)
router.post("/login",adminController.adminlogin)

module.exports = router;