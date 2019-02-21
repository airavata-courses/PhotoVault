const path = require("path");
const express = require("express");
const multiparty = require("multiparty");
const fs = require("fs");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
var cloudinary = require("cloudinary");
const multer = require("multer");
const passport = require("passport");

const router = express.Router();

cloudinary.config({
  cloud_name: "photovault",
  api_key: "511629731985125",
  api_secret: "Hz9Vupt0SuSyLVxoev-L7yCAulE"
});

var form = new multiparty.Form();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("giving path");
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    console.log("path");
    cb(null, file.originalname + ".png");
  }
});

// @route   POST api/uploadImg/upload
// @desc    Upload an image to cloudinary
// @access  Private
router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  multipartMiddleware,
  function(req, res) {
    // console.log(req.files.file.path);
    console.log("Upload HIT");
    img_path = req.files.file.path;
    console.log("image path = ", img_path);
    cloudinary.v2.uploader.upload(img_path, function(error, result) {
      if (error) {
        return res.send(error);
      } else {
        fs.unlink(img_path, err => {
          if (err) throw err;
          console.log("path/file.txt was deleted");
        });
        console.log("Download link = ", result);
        res.json(result);
      }
    });
  }
);

module.exports = router;
