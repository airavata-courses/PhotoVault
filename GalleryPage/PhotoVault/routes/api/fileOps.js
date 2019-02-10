const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const keys = require("../../config/keys");
const passport = require("passport");
const MediaFile = require("../../models/MediaFile");

//Load Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route   GET api/fileOps/:searchString
// @desc    Search an image based on searchString
// @access  Private
router.get(
  "/:searchString",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    res.header("Access-Control-Allow-Origin", "*");

    // console.log(
    //   "Hello, this is your search string = ",
    //   req.params.searchString
    // );

    console.log("User id = ", req.user.id);
    const errors = {};
    var page = parseInt(req.body.page) || 0;
    var limit = parseInt(req.body.limit) || 12;

    // var query = {
    //   fileName: {
    //     $regex: new RegExp(req.params.searchString, "i")
    //   }
    // };
    var query = {
      $or: [
        // {
        //   $and: [
        //     {
        //       fileName: {
        //         $regex: new RegExp(req.params.searchString, "i")
        //       }
        //     },
        //     {
        //       userId: req.user.id
        //     }
        //   ]
        // },
        // {
        //   $and: [
        //     {
        //       userId: req.user.id
        //     },
        //     {
        //       filePath: {
        //         $regex: new RegExp(req.params.searchString, "i")
        //       }
        //     }
        //   ]
        // },
        {
          $and: [
            {
              caption: {
                $regex: new RegExp(req.params.searchString, "i")
              }
            },
            {
              userId: req.user.id
            }
          ]
        },
        // {
        //   $and: [
        //     {
        //       hashtag: {
        //         $regex: new RegExp(req.params.searchString, "i")
        //       }
        //     },
        //     {
        //       userId: req.user.id
        //     }
        //   ]
        // },
        {
          $and: [
            {
              location: {
                $regex: new RegExp(req.params.searchString, "i")
              }
            },
            {
              userId: req.user.id
            }
          ]
        }
      ]
    };

    MediaFile.find(query)
      .sort({
        update_at: -1
      })
      .skip(page * limit)
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.json(err);
        }
        MediaFile.count(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            page: page,
            pageSize: doc.length,
            media: doc
          });
        });
      });

    // ------------------------------------------------------------------------

    // MediaFile.find()
    //   .then(res => console.log("res = ", res))
    //   .catch(err => console.log("err = ", err));

    // const media = new MediaFile({
    //   userId: "test2"
    // });
    // media
    //   .save()
    //   .then(res => console.log("res = ", res))
    //   .catch(err => console.log("err = ", err));
  }
);
// console.log(
//   "Hello, this is your search string = ",
//   req.params.searchString
// );
// res.json({ searchString: req.params.searchString });
// }
// );

// @route   DELETE api/delete/:id
// @desc    Delete image based on id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(
      MediaFile.findById(req.params.id)
        .then(post => {
          // Check for file owner
          if (MediaFile.userId.toString() != req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "User not authorized." });
          }
          // Delete
          MediaFile.remove().then(() =>
            res.json({
              success: true
            })
          );
        })
        .catch(err =>
          res.status(404).json({
            fileNotFound: "No file found"
          })
        )
    );
  }
);

// @route   GET api/recent/:userId
// @desc    Get recently uploaded images based on user id
// @access  Private
router.get(
  "/recent/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("userID = ", req.params.userId);
    var query = {
      userId: {
        $regex: new RegExp(req.params.userId, "i")
      }
    };

    MediaFile.find(query).exec((err, doc) => {
      if (err) {
        return res.json(err);
      }
      return res.json({
        media: doc
      });
    });
  }
);

module.exports = router;
