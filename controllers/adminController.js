const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const Admin = require("../models/adminModel.js");


const admin = async (req, res) => {
    const { email, password } = req.body;

    try {

        const admin = await Admin.findOne({ email });


        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }


        const isMatch = await bcrypt.compare(password, admin.password);


        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }


        const token = generateToken(admin._id);


        res.status(200).json({
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            token: token,
        });
    } catch (error) {

        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });

if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const admin = new Admin({
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
    });
    await admin.save();
    console.log('Admin user created');
} else {
    console.log('Admin user already exists');
}

module.exports = {
    admin
}