const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackListTokenModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }


    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });

}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}


// module.exports.updateCaptainProfile=async(req,res,next)=>{
//     const {fullname,email,password,color,plate,capacity,vehicleType}=req.body;

//     const captain=req.captain;
//     if(fullname){
//         captain.firstname=fullname.firstname;
//         captain.lastname=fullname.lastname;
//     }
//     if(email){
//         captain.email=email;
//     }   
//     if(color){
//         captain.vehicle.color=color;
//     }
   
//     if(password){
//         captain.password=await captainModel.hashPassword(password);
//     }
//     await captain.save();
//     res.status(200).json({captain});
// }
module.exports.updateCaptainProfile = async (req, res, next) => {
    try {
        const { fullname, email, password, vehicle } = req.body; 
        
        const captain = req.captain;
        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        console.log(fullname)
        if(fullname){
            captain.firstname= fullname.firstname;
            captain.lastname=fullname.lastname;
            console.log("Hello ")
        }
       
        
        if (email) {
            captain.email = email;
        }

        if (password) {
            captain.password = await captainModel.hashPassword(password);
        }

        if (!captain.vehicle) {
            captain.vehicle = {};
        }

        if (vehicle) {
            captain.vehicle.color = vehicle.color || captain.vehicle.color;
            captain.vehicle.plate = vehicle.plate || captain.vehicle.plate;
            captain.vehicle.capacity = vehicle.capacity || captain.vehicle.capacity;
            captain.vehicle.vehicleType = vehicle.vehicleType || captain.vehicle.vehicleType;
        }

    
        await captain.save();
        res.status(200).json({ captain });
    } catch (error) {
        console.error("Error updating captain profile:", error);
        next(error);
    }
};


module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}