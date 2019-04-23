const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const User = require("../model/User");

//@route  POST api/users/register
//@desc   Registering user / Returning user details
//@access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser.save((err, user) => {
            if (err) console.log(err);
            else {
              res.json(user);
            }
          });
        });
      });
    }
  });
});

//@route  POST api/users/login
//@desc   Login user / Returning jwt token
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (!user) {
      return res.status(404).json({ email: "User not found !" });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //res.json({ msg: "Success" });
          //User matched

          const payload = {
            //Create jwt payload
            id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName
          };
          console.log(payload);

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ password: "Password incorrect" });
        }
      });
    }
  });
});

//@route  GET api/users/current
//@desc    Returning current user
//@access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      userName: req.user.userName,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    });
  }
);

module.exports = router;
