const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 5000;
const fileupload = require("express-fileupload");

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileupload({
        useTempFile:true,
        tempFileDir:"/tmp",
    })
);

//cloud se connect krna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();


//routes
const userRoutes = require("./routes/User");
const analyze = require("./routes/Analyze");
const Upload = require("./routes/FileUpload");



//mounting the routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", analyze);
app.use("/api/v1/upload", Upload);


//dbconnection
const {dbConnect} = require("./config/database");
dbConnect();


app.get("/", (req, res) => {
    res.send("Working fine.");
});



app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});