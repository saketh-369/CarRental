const User = require("../models/userModel");

const getHomePage = async (req, res) => {
    const user = req.user;
  
    console.log("data", user.data);
    const findUser = await User.findOne({ email: user.data });
  
    if (!findUser) {
      return res.json({ message: "authentication failed", success: false });
    }
    
    res.json({ message: "authenticateUser", success: true });


      
};




module.exports = getHomePage;