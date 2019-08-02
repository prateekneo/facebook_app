let services = require('../services/services.js');
const { check, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
    
const express = require('express');
const router = express.Router();



const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'qwerty';

passport.use('jwt',new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received');
        services.fetch(jwt_payload.id).then(user => {
            if (user) {
                return next(null, user);
            } else {
                return next(null, false);
                // or you could create a new account
            }
        }).catch(err=> console.log(err));
})
)

router.get('/', (req, res, next) => {

    passport.authenticate('jwt', { session: false }, (err, user) => {
        if(err){
            console.log(err);
        }
        res.status(200).json({user : user})
    })(req, res, next)
        //res.status(200).json({message :'Authenticated'});
})

module.exports = router;