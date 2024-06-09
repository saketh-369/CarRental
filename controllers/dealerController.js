const Dealer = require("../models/dealerModel");

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

const getDealerById = async (req, res) => {
  const dealerId = req.params.id; 

  try {
      
      const dealer = await Dealer.findById(dealerId).populate('vehicles');

      if (!dealer) {
          return res.status(404).json({ error: 'Dealer not found' });
      }

      res.status(200).json(dealer);
  } catch (error) {
      console.error('Error fetching dealer:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { dealerDetails, getDealerById };