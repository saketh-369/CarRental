const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const dealerController = require("../../controllers/dealerController");
const vehicleListController = require("../../controllers/vehicleListController")


router.post("/signup",adminController.adminsignup)
router.post("/login",adminController.adminlogin)
router.post("/dealer",dealerController.dealerDetails);
router.get("/get-dealer",dealerController.getDealer);
router.post("/vehiclelist",vehicleListController.updateVehicle);
router.get("/")



module.exports = router;