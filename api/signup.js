let services = require('../services/services.js');
const nodemailer = require("nodemailer");
const uuid = require('uuidv4');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
    
const express = require('express');
const router = express.Router();

let generateOTP = () => {
          
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP;
}

router.post('/', [
    check('first_name','Name is required')
    .not()
    .isEmpty(),
    check('user_email', 'Enter valid email')
    .isEmail(),
    check('user_password','Please enter password with 8 or more characters')
    .isLength({min:8})
] , async (req, res) => {

        let body = req.body

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({
                errors: errors.array()
            });
        }

        

        bcrypt.genSalt(10, (err, salt) => {
            if(err){
                console.log(err);
            } else {
                bcrypt.hash(body.user_password, salt, (err, hash) => {
                    if(err){
                        console.log(err);
                    } else{
                        body.user_password = hash;
                        if(body.hasOwnProperty('first_name') && body.hasOwnProperty('user_email') && body.hasOwnProperty('user_password') && body.hasOwnProperty('dob') && body.hasOwnProperty('email_verified_status')){


                            services.check(body.user_email).then((obj) => {
                                if(obj === 'not_registered'){
               
                                    body.user_registration_id = uuid();
                                    body.otp_requested = generateOTP();
                                    
                                        services.create(body).then((obj) => {
                                            obj = JSON.parse(obj);
                                            console.log(obj);
                                            services.send_mail(body.otp_requested).then((resolve) => {
                                                res.status(200).json({message :'inserted', userid : obj.user_registration_id});
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                        }).catch((err) => {
                                            console.log(err);
                                        })
                                } else {
                                    res.status(400).json({message : obj});
                                }
                            }).catch((err) => {
                                console.log(err);
                            })              
                        }
                    }
                })
            }
        })
});

module.exports = router;