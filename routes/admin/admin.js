const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const dealerController = require("../../controllers/dealerController");
const vehicleListController = require("../../controllers/vehicleListController");
const authenticateAdmin = require("../../MiddleWare/adminMiddleWare");
const Admin = require("../../models/adminModel");


router.post("/signup",adminController.adminsignup)
router.post("/login",adminController.adminlogin)
router.get("/check-admin", authenticateAdmin, async (req, res) => {
    const admin = req.admin;
  
    const findAdmin = await Admin.findOne({ email: admin.data });
  
    if (!findAdmin) {
      return res.json({ message: "authentication failed", success: false });
    }
    
    res.json({ message: "authenticateUser", success: true });
  });
router.post("/dealer",dealerController.dealerDetails);
router.get("/get-dealer",dealerController.getDealer);
router.post("/vehiclelist",vehicleListController.updateVehicle);
router.get("/")



module.exports = router;