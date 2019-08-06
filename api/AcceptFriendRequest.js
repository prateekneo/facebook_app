let services = require('../services/services.js');

const express = require('express');
const router = express.Router();
const uuid = require('uuidv4');
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
                console.log('prateek');
                return next(null, user);
            } else {
                console.log('prateek1');
                return next(null, false);
                // or you could create a new account
            }
        }).catch(err=> console.log(err));
})
)

router.post('/', (req, res, next) => {

    passport.authenticate('jwt', { session: false }, (err, user) => {
        if(err){
            console.log(err);
        } else if(user) {
            services.acceptRequest(req.body).then((obj)=> {

                res.status(200).json({post : obj})

            }).catch((err) => {
                console.log(err);
            })

        } else {

        }
    })(req, res, next)
})

module.exports = router;