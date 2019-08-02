let user = require('../Model/UserRegistration.js')
const nodemailer = require("nodemailer");

async function create (body) {
    console.log(body);
    return await user.create(body).then((obj) => {
        console.log(JSON.stringify(obj));
        return JSON.stringify(obj);
    }).catch((err) => {
        return err;
    })
}

async function login (email) {
    //console.log(body);
    return await user.findAll({
        where : {
            user_email : email
        }
    }).then((obj) => {
        return JSON.stringify(obj)
    }).catch((err) => {
        return err;
    })
}

async function fetch (userid) {
    //console.log(body);
    return await user.findAll({
        where : {
            user_registration_id : userid
        }
    }).then((obj) => {
        return JSON.stringify(obj)
    }).catch((err) => {
        return err;
    })
}

async function check (email) {

    let User =  await user.findOne({where:{
        user_email : email
    }})
    if(User){
        return 'User Already registered';
    } else {
        return "not_registered";
    }
}

async function checkotp (body) {

    return await user.update(
        {   
            email_verified_status : 1,
            otp_requested : 0
        },
        {where: body}
      )
      .then(function(rowsUpdated) {
        console.log('here');
        return "Updated";
      })
      .catch((err)=> {
            console.log(err);
      })
}

async function checkOtpByEmail (email) {

    let User =  await user.findOne({where:{
        user_email : email
    }})
    if(User){
        //return JSON.stringify(User);
        return JSON.stringify(User);
    } else {
        return "not_registered";
    }
}

async function saveOtp (otp, userid) {

    return await user.update(
        {otp_requested : otp},
        {where: {
            user_registration_id : userid
        }}
      )
      .then(function(rowsUpdated) {
        console.log('here');
        return "Updated";
      })
      .catch((err)=> {
            console.log(err);
      })
}

async function saveNewPassword (userid, password) {

    return await user.update(
        {user_password : password},
        {where: {
            user_registration_id : userid
        }}
      )
      .then(function(rowsUpdated) {
        console.log('here');
        return "Updated";
      })
      .catch((err)=> {
            console.log(err);
      })
}

async function saveOtpByEmail (otp, email) {

    return await user.update(
        {otp_requested : otp},
        {where: {
            user_email : email
        }}
      )
      .then(function(rowsUpdated) {
        console.log('here');
        return "Updated";
      })
      .catch((err)=> {
            console.log(err);
      })
}

async function send_mail (otp) {

    main(otp).then(()=>{
        console.log("mail sent");
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

let services = {
    create : create,
    login : login,
    check : check,
    checkotp : checkotp,
    send_mail : send_mail,
    saveOtp : saveOtp,
    saveOtpByEmail : saveOtpByEmail,
    checkOtpByEmail : checkOtpByEmail,
    saveNewPassword : saveNewPassword,
    fetch : fetch
}

module.exports = services;