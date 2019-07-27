let services = require('../services/services.js');
const nodemailer = require("nodemailer");
const uuid = require('uuidv4');

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

}

async function main(otp){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "prateek@cronj.com", // generated ethereal user
            pass: "ithinkiamgood@" // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Prateek" prateek@cronj.com', // sender address
        to: "prateekneo123@gmail.com", // list of receivers
        subject: "Verify Email", // Subject line
        text: "Your OTP is : " + otp, // plain text body
        html: "Your OTP is : <b>" + otp + "</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

let send_mail = (req, res) => {

    

    main().then(()=>{
        console.log("mail sent");
    }).catch((err) => {
        console.log(err);
    })

    // async..await is not allowed in global scope, must use a wrapper
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