const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const keys = require("../../config/keys");
const passport = require("passport");
const MediaFile = require("../../models/MediaFile");

//Load Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route GET api/apiGateway/test
//@desc Route req to different microservices
//@access Public

router.get("/test", (req,res) => {
	res.json({msg: 'hello'});
});


module.exports = router;
