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


const getDealer = async (req, res) => {
  try {
    const dealers = await Dealer.find();
    const dealerDetail = dealers.map(dealer => ({
      id: dealer._id,
      name: dealer.name,
      email: dealer.email,
      phone: dealer.phone,
      address: dealer.address,
      companyName: dealer.companyName,
      companyWebsite: dealer.companyWebsite,
    }));
    res.status(200).send(dealerDetail);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching dealers', error });
  }
};


module.exports = { dealerDetails , getDealer};