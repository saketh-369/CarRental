const Dealer = require("../models/dealerModel");
const Vehicle = require("../models/vehicleModel");

const dealerDetails = async (req, res) => {
    try {
      
      const { name, email, phone, address, companyName, companyWebsite, vehicles } = req.body;
  
      
      const newDealer = new Dealer({
        name,
        email,
        phone,
        address,
        companyName,
        companyWebsite,
        vehicles,
      });
  
      
      const savedDealer = await newDealer.save();
  
      
      res.status(201).json(savedDealer);
    } catch (error) {
      
      console.error('Error creating dealer:', error);
      res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { dealerDetails };