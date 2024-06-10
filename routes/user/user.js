const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authenticateUser = require("../../MiddleWare/userMiddleWare.js");
const getHomePage = require("../../controllers/homeController.js");
const { getVehicle } = require("../../controllers/vehicleListController.js");


router.post("/signup",userController.signup)
router.post("/login",userController.signin)
router.get("/home",authenticateUser,getHomePage)
router.get("/get-vehicle",getVehicle)
router.get("/vehicledetails",getVehicle)
router.get("/dashboard")
router.get("/contact")
router.get("/membership")



module.exports = router;