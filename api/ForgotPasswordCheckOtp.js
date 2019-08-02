let services = require('../services/services.js');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

    services.checkOtpByEmail(req.body.user_email).then((obj)=> {
        console.log('here');
        obj = JSON.parse(obj);
        console.log(obj);
        if(obj.otp_requested === parseInt(req.body.otp_requested)){
            res.status(200).json({message: "Otp Verified. Enter new Password", userid : obj.user_registration_id})
        } else {
            res.status(400).json({message : "Otp is Invalid"})
        }
    }).catch((err)=> {
        console.log(err)
    })
})

module.exports = router;