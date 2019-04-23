const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; //enable to extract payload

const mongoose = require("mongoose");
const User = mongoose.model("user");
const keys = require("./keys");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //specify we want to use bearer token
opts.secretOrKey = keys.secretOrKey; //add secret or key

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //create new stratergy and pass in options and  a callback function with payload
      User.findById({ _id: jwt_payload.id }, (err, user) => {
        if (err) {
          //Find the user and validate it
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
