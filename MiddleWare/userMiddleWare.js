const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authenticateUser(req, res, next) {
    // console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
      return res.sendStatus(401); 
    }
    jwt.verify(token, process.env.SE, (err, user) => {
      

      if (err) return res.sendStatus(403);
      
      req.user = user;
  
      next();
    });
}

module.exports = authenticateUser;
