const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () =>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connection successfull.");
    })
    .catch((error) => {
        console.log("Error in db connection :", error);
        process.exit(1);
    })
}
