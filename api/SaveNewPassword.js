let services = require('../services/services.js');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


router.post('/', [
    check('user_password','Please enter password with 8 or more characters')
    .isLength({min:8})
], async (req, res) => {

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
            bcrypt.hash(req.body.user_password, salt, (err, hash) => {
                if(err){
                    console.log(err);
                } else{
                    req.body.user_password = hash;
                    services.saveNewPassword(req.body.user_registration_id, req.body.user_password).then((str)=> {
                        res.status(200).json({message : "Password Successfully Changed"})

                    }).catch((err) => {
                        console.log(err);
                    })
                }
            })
        }
    })
})

module.exports = router;