const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

function authenticateAdmin(req, res, next) {
    // console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
      return res.sendStatus(401); 
    }
    jwt.verify(token, process.env.SE, (err, admin) => {
      
        
      if (err) return res.sendStatus(403);
      
      req.admin = admin;
      
      next();
    });
}

module.exports = authenticateAdmin;