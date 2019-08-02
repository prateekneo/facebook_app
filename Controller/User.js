let services = require('../services/services.js');
const nodemailer = require("nodemailer");
const uuid = require('uuidv4');
const { check, validationResult } = require('express-validator');

let generateOTP = () => {
          
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 4; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP;
}

let create = (req, res) => {
    console.log('prateek1');
   let body = req.body

   if(body.hasOwnProperty('first_name') && body.hasOwnProperty('user_email') && body.hasOwnProperty('user_password') && body.hasOwnProperty('dob') && body.hasOwnProperty('email_verified_status')){

        if(body.firt_name !== ''){
            if(body.user_email !== ''){
                if(body.user_password !== ''){
                    if(body.dob !== ''){
                        if(body.email_verified_status !== ''){

                            console.log("req=====>>>>", req.body);
                            body.user_registration_id = uuid();
                            body.otp_requested = generateOTP();
                            
                                console.log("body ==============>>>>>>>", body);
                                services.create(body).then((obj) => {
                                    new Promise ((resolve) =>  {
                                        main(body.otp_requested)
                                        resolve("sent")
                                    }).then((resolve) => {
                                        console.log('inserted');
                                        res.status(200).send('inserted');
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                }).catch((err) => {
                                    console.log(err);
                                })

                        } else{

                        }
                    }
                }
            }
        }
   }
    

}



let signin = (req, res) => {

    services.login(req.body).then((arr)=>{
        arr = JSON.parse(arr);
        console.log(arr);
        if(arr.length > 0){
            console.log('found')
            res.status(200).send("found")
        } else {
            res.status(404).send("invalid");
        }
    }).catch((err) => {
        console.log(err);
    })

    // async..await is not allowed in global scope, must use a wrapper
}

let user = {
    create : create,
    send_mail : send_mail,
    signin : signin
}

module.exports = user