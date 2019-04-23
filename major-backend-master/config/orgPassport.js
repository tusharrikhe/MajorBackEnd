const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; //enable to extract payload

const mongoose = require("mongoose");
const Org = require("../model/Org");
const keys = require("./keys");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //specify we want to use bearer token
opts.secretOrKey = keys.secretOrKey; //add secret or key

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //create new stratergy and pass in options and  a callback function with payload
      Org.findById({ _id: jwt_payload.id }, (err, org) => {
        if (err) {
          //Find the org and validate it
          return done(err, false);
        }
        if (org) {
          return done(null, org);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
