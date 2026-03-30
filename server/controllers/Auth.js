const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
require("dotenv").config();

//send otp
exports.sendOTP = async (req, res) => {
  try {
    const { Email } = req.body;

    const otp = await otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP::", otp);

    //otp should be unique
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpBody = await OTP.create({
        Email:Email,
        otp:otp
    })

    return res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        otp:otp
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in sendotp controller.",
    });
  }
};

//signup
exports.signup = async (req, res) => {
  try {
    //data fetch
    const { Name, Email, Password } = req.body;

    //data validation
    if (!Name || !Email || !Password) {
      return res.status(404).json({
        success: false,
        message: "Please fill all the details.",
      });
    }

    //user exist or not
    const user = await User.findOne({ Email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "User already signed up, please login.",
      });
    }

    //password hashing
    const hashedPassword = await bcrypt.hash(Password, 10);

    //user save in database
    const newUser = await User.create({
      Name,
      Email,
      Password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    console.log("Error in  signup controller:", error);
    res.status(500).json({
      success: false,
      message: "Error in signup controller.",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //fetch data
    const { Email, Password } = req.body;

    //data validation
    if (!Email || !Password) {
      return res.status(404).json({
        success: false,
        message: "Please fill all the details.",
      });
    }

    //check user exist or not
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Please, sign up first.",
      });
    }

    //password verify
    if (await bcrypt.compare(Password, user.Password)) {
      const payload = {
        id: user._id,
        Name: user.Name,
        Email: user.Email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.Password = undefined;

      //create ccokie
      const options = {
        expires: new Date(Date.now() + 3 * 34 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token: token,
        user: user,
        message: "User Logged in successfuly.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }
  } catch (error) {
    console.log("Error in  login controller:", error);
    res.status(500).json({
      success: false,
      message: "Error in login controller.",
    });
  }
};
