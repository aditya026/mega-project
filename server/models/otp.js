const mailSender = require("../utils/mailSender") 
const mongoose = required("mongoose")

const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true 
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60, 
    }

})

// to send the OTP we need to make the pre middleware which places
// schema ke neeche && model ke uper
// function to send the email

const sendVarificationEmail = async (email, otp) => {
    try{
        const mailResposne = await mailSender(email, "varification Email from selfStudy", otp)
        console.log("Email sent Successfully:", mailResposne)

    }catch(error){
        console.log("error occured in sending OTP mail:",error)
    }
}


otpSchema.pre("save", async function(next) {
    await sendVarificationEmail(this.email, this.otp);
    next()
})


module.exports = mongoose.model("OTP", otpSchema)