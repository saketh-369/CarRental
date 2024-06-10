const Vehicle = require("../models/vehicleModel")
const Dealer = require("../models/dealerModel");




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


const updateVehicle = async (req, res) => {

    try {
        const dealerId = req.body[Object.keys(req.body)[5]]
        const { make, model, year, pricePerDay, availability } = req.body;

        
        
        const newVehicle = new Vehicle({
            make,
            model,
            year,
            pricePerDay,
            availability,
            dealer: dealerId,
        });


        const savedVehicle = await newVehicle.save();
    
        await addVehicleToDealer(dealerId, savedVehicle._id);

        res.status(201).json(savedVehicle);
    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({ error: 'Server error' });
    }

}



const getVehicle = async(req,res)=>{
    const vehicle = await Vehicle.find();
    res.send(vehicle).status(200);
}



module.exports = {updateVehicle, getVehicle};