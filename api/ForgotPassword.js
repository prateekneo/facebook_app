let services = require('../services/services.js');
const { check, validationResult } = require('express-validator');

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

let generateOTP = () => {
          
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP;
}

router.post('/', [
    check('user_email', 'Enter valid email')
    .isEmail()
], (req, res) => {

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({
                errors: errors.array()
            });
        }
    services.check(req.body.user_email).then( (str)=> {

        if(str === 'not_registered'){
            res.status(400).json({message : "Email doesn't Exist"})
        } else {
            let otp = generateOTP();
            services.saveOtpByEmail(otp, req.body.user_email).then((str)=> {
                services.send_mail(otp).then( (str)=> {
                    res.status(200).json({message : "One Time Password(OTP) is sent to your Email " + req.body.user_email})
                }).catch((err)=> {
                    console.log(err);
                    res.status(400).json({message : err});
                })
            }).catch((err) => {
                console.log(err);
                res.status(400).json({message : err});
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(400).json({message : err})
    })
})

module.exports = router;