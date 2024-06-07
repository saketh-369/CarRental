const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    adminpassword:{
        type: String,
        required: true,
    }
})


const Admin = new mongoose.model("ADMIN", adminSchema);

module.exports = Admin;