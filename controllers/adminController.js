const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const Admin = require("../models/adminModel.js");


const adminsignup = async (req, res) => {
    try {
        
        const { username, email, password } = req.body;
        
    const adminExist = await Admin.findOne({ email });
    if(adminExist){
        return res.send("admin already exist");
    }

    
    const saltRounds = 10;
    const adminpassword = await bcrypt.hash(password,saltRounds);
    
    const newAdmin = new Admin ({
        username,
        email,
        adminpassword
    })

    const newAdminCreated = await newAdmin.save();

    console.log(newAdminCreated);

    if(!newAdmin){
        return res.send("Admin not created");
    }

    const token = generateToken(email);
    res.json({ token });
    // res.cookie("token",token);
    // res.send("registered successfully")
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const adminlogin = async (req,res) => {
    try {
        const {email, password} = req.body;
        const admin = await Admin.findOne({email});

        console.log(admin);

        if(!admin){
            return res.send("admin not exist");
        }
        const matchPassword = await bcrypt.compare(password,admin.adminpassword);

        
        
        
        if(!matchPassword){
            return res.send("password incorrect");
        }
        const token = generateToken(email);
        res.json({ token });
        // res.cookie("token",token);
        // res.send("Logged in");

    } catch (error) {
        console.log(error);
        res.send(error);
    }
}




module.exports = {
    adminsignup,
    adminlogin
}