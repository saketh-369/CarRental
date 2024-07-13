const USER = require('../models/userModel');
const mongoose = require('mongoose');


const getUserData = (userID) => {
    return USER.find({_id:userID},{hashPassword:0})
}

