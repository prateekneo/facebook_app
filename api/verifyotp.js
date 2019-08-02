let services = require('../services/services.js');
const express = require('express');
const router = express.Router();


var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'qwerty';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
});

passport.use(strategy);

router.post('/', async (req, res) => {

    console.log(req.body);

    await services.checkotp(req.body).then((obj)=> {
        console.log('here');
        let payload = {id: req.body.user_registration_id};
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        let userid  = req.body.user_registration_id;
        console.log(userid);
        res.status(200).json({message: "ok", token: token, isAuth : true, userid : userid});
        //res.status(200).json('Updated');
    }).catch((err)=> {
        console.log(err)
    })
})

module.exports = router;