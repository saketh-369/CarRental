const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authenticateUser = require("../../MiddleWare/userMiddleWare.js");

router.get("/check-user", authenticateUser, async (req, res) => {
    const user = req.user;
  
    console.log("data", user.data);
    const findUser = await User.findOne({ email: user.data });
  
    if (!findUser) {
      return res.json({ message: "authentication failed", success: false });
    }
    
    res.json({ message: "authenticateUser", success: true });
});


router.post("/signup",userController.signup)
router.post("/login",userController.signin)


module.exports = router;