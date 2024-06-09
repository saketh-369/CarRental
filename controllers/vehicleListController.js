const Vehicle = require("../models/vehicleModel")
const Dealer = require("../models/dealerModel");
const getDealerById = require("../controllers/dealerController")

const updateVehicle = async (req, res) => {

    try {
        const { make, model, year, pricePerDay, availability, dealerId } = req.body;

        const newVehicle = new Vehicle({
            make,
            model,
            year,
            pricePerDay,
            availability,
            dealer: dealerId,
        });


        const savedVehicle = await newVehicle.save();

        const dealer = await Dealer.findById(dealerId);
        dealer.vehicles.push(savedVehicle._id);
        await dealer.save();

        res.status(201).json(savedVehicle);
    } catch (error) {
        console.error('Error creating dealer:', error);
        res.status(500).json({ error: 'Server error' });
    }


    

}

module.exports = {updateVehicle};