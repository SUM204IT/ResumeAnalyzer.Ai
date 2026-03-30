const mongoose = require("mongoose");
const {mailSender} = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:20*60,
    }
});

async function sendVerificationEmail(Email, otp) {
    try {
        const mailResponse = await mailSender(Email, "Verification Email from StudyNotion", otp);
        console.log("Email sent successfully", mailResponse);
    } catch (error) {
        console.log("Error in sending mail:",error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.Email, this.otp);
    // next();
})

module.exports = mongoose.model("OTP", OTPSchema);