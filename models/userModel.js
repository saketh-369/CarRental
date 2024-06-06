const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20,
    },
    lastname : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 20,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    hashPassword : {
        type : String,
        required : true
    },
    
});

const User = mongoose.model("User", userSchema);

module.exports = User;