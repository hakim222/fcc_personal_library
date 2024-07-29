require('dotenv').config;
const mongoose = require('mongoose');

const dbConnect = async ()=>{
    
    try {
        let connect_res =  await mongoose.connect(
            process.env.MONGO_URI,
            {
            }
        )
        console.log("Succesfully connected to database!");
    }
    catch(err)
    {
        console.log("Unable to connect with the database!")
        console.error(error);
    }
    
}

module.exports = dbConnect;