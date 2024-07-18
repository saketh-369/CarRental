const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function authenticateUser(req, res, next) {
    // console.log(req.cookies);
    const token = req.headers.authorization;
    
    
    if (!token) {
      return res.sendStatus(401); 
    }
    jwt.verify(token, process.env.SE, (err, user) => {
      

      if (err) return res.sendStatus(403);
      
      req.user = user;

      // getUserData(user?.userID).then((response) => {
        
      // });

      next();
    });
}

module.exports = authenticateUser;
