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

let generateOTP = () => {
          
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP;
}

router.post('/',[
    check('user_email', 'Enter valid email')
    .isEmail(),
    check('user_password','Please enter password with 8 or more characters')
    .isLength({min:8})
], async (req, res) => {

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }

        services.login(req.body.user_email).then((arr)=>{

            
            arr = JSON.parse(arr);
            console.log(arr);
            if(arr.length > 0){
                checkUser(arr[0].user_password, req.body.user_password).then((bool) => {
                    if(bool){     
                        if(arr[0].email_verified_status === false){
                            let otp = generateOTP();
                            services.send_mail(otp).then((resolve) => {
                                services.saveOtp(otp, arr[0].user_registration_id).then((obj) => {
                                    res.status(200).json({message : 'Your Email is not Verified', userid : arr[0].user_registration_id})
                                }).catch((err) => {
                                    res.status(400).json(err);
                                })
                               
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else {

                            let payload = {id: arr[0].user_registration_id};
                            let token = jwt.sign(payload, jwtOptions.secretOrKey);
                            let userid  = arr[0].user_registration_id;
                            console.log(userid);
                            res.status(200).json({message: "Login Successful", token: token, isAuth: true, userid : userid});

                        }
                    } else {
                        res.status(404).json({message : "Wrong Password"});
                    }
                }) 
            } else {
                    res.status(404).json({message : "Email Not Found"});
                }
    }).catch((err) => {
        console.log(err);
    })
})

async function checkUser ( input_password, password ) {
    const match = await bcrypt.compare(password, input_password);
    console.log(match);
    if(match){
        return true;
    } else {
        return false;
    }
}

module.exports = router;