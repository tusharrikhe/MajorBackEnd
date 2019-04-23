const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const Org = require("../model/Org");
// @route   GET api/orgs/test
// @desc    Tests org route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Org Works" }));

//@route  POST api/orgs/register
//@desc   Registering organization / Returning organization details
//@access Public
router.post("/register", (req, res) => {
  Org.findOne({ email: req.body.email }, (err, org) => {
    if (err) {
      console.log(err);
    } else if (org) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newOrg = new Org({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newOrg.password, salt, (error, hash) => {
          if (error) throw error;
          newOrg.password = hash;
          newOrg.save((err, org) => {
            if (err) console.log(err);
            else {
              res.json(org);
            }
          });
        });
      });
    }
  });
});

//@route  POST api/orgs/login
//@desc   Login org / Returning jwt token
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Org.findOne({ email }, (err, org) => {
    if (err) {
      console.log(err);
    } else if (!org) {
      return res.status(404).json({ email: "Organization not found !" });
    } else {
      bcrypt.compare(password, org.password).then(isMatch => {
        if (isMatch) {
          //res.json({ msg: "Success" });
          //User matched

          const payload = {
            //Create jwt payload
            id: org._id,
            userName: org.name,
            email: org.email
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

//@route  GET api/orgs/current
//@desc    Returning current organization
//@access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.org.id,
      name: req.org.name,
      email: req.org.email
    });
  }
);

module.exports = router;
