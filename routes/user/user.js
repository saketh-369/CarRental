const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authenticateUser = require("../../MiddleWare/userMiddleWare.js");
const getHomePage = require("../../controllers/homeController.js");
const { getVehicle,cardetail } = require("../../controllers/vehicleListController.js");
const User = require("../../models/userModel.js");


router.post("/signup",userController.signup)
router.post("/login",userController.signin)
router.get("/home",authenticateUser,getHomePage)
router.get("/check-user", authenticateUser, async (req, res) => {
    const user = req.user;
  
    const findUser = await User.findOne({ email: user.data });
  
    if (!findUser) {
      return res.json({ message: "authentication failed", success: false });
    }
    
    res.json({ message: "authenticateUser", success: true });
  });
router.get("/get-vehicle",getVehicle)
router.get("/get-vehicle/:id",cardetail)
router.get("/vehicledetails",getVehicle)
router.get("/dashboard")
router.get("/contact")
router.get("/membership")


router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    const findUser = await User.findOne({ email: user.data });

    if (!findUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.json({
      success: true,
      data: {
        name: findUser.firstname,
        email: findUser.email,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});


module.exports = router;