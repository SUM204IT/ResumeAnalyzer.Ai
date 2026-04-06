const File = require("../models/File");
const cloudinary = require("cloudinary");

//local file upload handler function-business logic
exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;
    console.log("file::", file);

    //is file ko apne server ke kis path pe store krna hai
    let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

    file.mv(path, (err) =>{
        console.log(err);
    });
    // return res.json({
    //     success:true,
    //     message:"Local file uploaded successfully",
    //     filePath:path,
    // })

    //using cloudinary for production services
    const uploadFile = await cloudinary.uploader.upload(path);

    console.log("Cloudinary result::", uploadFile);
    console.log("Filepath:::", uploadFile.secure_url);

    return res.json({
      success: true,
      message: "File uploaded successfully",
      filePath: uploadFile.secure_url,
    });
  } catch (error) {
    console.log(error);
  }
};
