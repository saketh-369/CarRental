const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const signup = async( req,res ) => {
    
    try {
        
        const { firstname, lastname, email, password } = req.body;
        
    const userExist = await User.findOne({ email });
    if(userExist){
        return res.send("user already exist");
    }

    
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password,saltRounds);
    
    const newUser = new User ({
        email,
        firstname,
        lastname,
        hashPassword
    })

    const newUserCreated = await newUser.save();

    console.log(newUserCreated);

    if(!newUser){
        return res.send("user not created");
    }

    const token = generateToken(email);
    res.cookie("token",token);
    res.send("registered successfully")
    } catch (error) {
        console.log(error);
        res.send(error);
    }



    
};


const signin = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        console.log(user);

        if(!user){
            return res.send("user not exist");
        }
        const matchPassword = await bcrypt.compare(password,user.hashPassword);

        const token = generateToken(email);
        
        
        if(!matchPassword){
            return res.send("password incorrect");
        }
        res.cookie("token",token);
        res.send("Logged in");

    } catch (error) {
        console.log(error);
        res.send(error);
    }


    
};


module.exports = {
    signin,
    signup
}