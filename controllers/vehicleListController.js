const Vehicle = require("../models/vehicleModel");
const Dealer = require("../models/dealerModel");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

async function addVehicleToDealer(dealerId, vehicleId) {
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) {
        console.error('Dealer not found');
        return;
    }

    dealer.vehicles.push(vehicleId);
    await dealer.save();
    console.log('Vehicle added to dealer:', dealer);
}

const getDealerIdByUsername = async (name) => {
    const dealer = await Dealer.findOne({ name }); // Assuming username is a unique field in Dealer model
    return dealer ? dealer._id : null;
};

const updateVehicle = async (req, res) => {
  try {
    const { make, model, year, pricePerDay, availability, dealer } = req.body;

    // Retrieve dealerId using getDealerIdByUsername
    const dealerId = await getDealerIdByUsername(dealer);

    if (!dealerId) {
        return res.status(400).json({ error: 'Dealer not found' });
    }

    const newVehicle = new Vehicle({
        make,
        model,
        year,
        pricePerDay,
        availability,
        dealer: dealerId, // Assign ObjectId of dealer
    });

    const savedVehicle = await newVehicle.save();

    // Update dealer's vehicles array
    await addVehicleToDealer(dealerId, savedVehicle._id);


    res.status(201).json(savedVehicle);
} catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ error: 'Server error' });
}
};

const getVehicle = async (req, res) => {
  try {
      const vehicles = await Vehicle.find().populate('dealer');
      const vehiclesWithCity = vehicles.map(vehicle => ({
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          pricePerDay: vehicle.pricePerDay,
          availability: vehicle.availability,
          city: vehicle.dealer ? vehicle.dealer.address.city : 'Unknown', // Check if dealer exists
      }));
      res.status(200).send(vehiclesWithCity);
  } catch (error) {
      res.status(500).send({ message: 'Error fetching vehicles', error });
  }
  
};


const cardetail = async (req, res) => {
    try {
        const id = req.params.id;
        const vehicle = await Vehicle.findById(id).populate('dealer');
        if (!vehicle) {
            return res.status(404).send({ message: 'Vehicle not found' });
        }
        const vehicleDetails = {
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            pricePerDay: vehicle.pricePerDay,
            availability: vehicle.availability,
            city: vehicle.dealer.address.city,
        };
        res.status(200).send(vehicleDetails);

    } catch (error) {
        res.status(500).send({ message: 'Error fetching vehicles', error });
    }
};

module.exports = { updateVehicle, getVehicle, cardetail };
