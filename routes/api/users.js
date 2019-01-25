const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', function (req, res) {
  res.json({ msg: 'hello' });
});

// @route   POST api/users/register
// @desc    Register user route
// @access  Public

router.post('/register', (req, res) => {
  console.log('request is ', req.body);
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(404).json(errors);
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,

        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login user / Get JWTToken
// @access  Public

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation errors
  if (!isValid) {
    return res.status(400).json(errors);
  }


  //Check for user
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log("ok");
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      //Check if password matches
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            errors.password = 'Incorrect password';
            return res.status(400).json(errors);
          }
          else {

            //User matched
            const payload = { id: user.id, lastName: user.lastName };
            jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
              res.json(
                {
                  success: true,
                  token: 'Bearer ' + token
                }
              )
            });

          }
        })

    });
});

// @route   GET api/users/current
// @desc    Get current user
// @access  Private

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  });
});

module.exports = router;
