const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const dealerController = require("../../controllers/dealerController");
const vehicleListController = require("../../controllers/vehicleListController")
const authenticateAdmin = require("../../MiddleWare/adminMiddleWare")

router.post("/signup",adminController.adminsignup)
router.post("/login",adminController.adminlogin)
router.post("/dealer", authenticateAdmin ,dealerController.dealerDetails);
router.post("/vehiclelist",authenticateAdmin,vehicleListController.updateVehicle);



module.exports = router;