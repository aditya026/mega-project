const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("connection successfull to the DB")
    }catch(error){
        console.log("connection to the DB failed")
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB