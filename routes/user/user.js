const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authenticateUser = require("../../MiddleWare/userMiddleWare.js");
const getHomePage = require("../../controllers/homeController.js")


router.post("/signup",userController.signup)
router.post("/login",userController.signin)
router.get("/home",authenticateUser,getHomePage)
router.get("/vehicle")
router.get("/vehicledetails")
router.get("/dashboard")
router.get("/contact")
router.get("/membership")


module.exports = router;