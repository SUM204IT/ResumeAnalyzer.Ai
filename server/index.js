const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 4000;


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)
// app.use(
//     fileUpload({
//         useTempFile:true,
//         tempFileDir:"/tmp",
//     })
// );


//routes
const userRoutes = require("./routes/User");
const analyze = require("./routes/Analyze");



//mounting the routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", analyze);


//dbconnection
const {dbConnect} = require("./config/database");
dbConnect();


app.get("/", (req, res) => {
    res.send("Working fine.");
});



app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});