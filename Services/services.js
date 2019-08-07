let user = require('../Model/UserRegistration.js')
let post = require('../Model/Post.js')
let friends = require('../Model/Friend.js')
let friend_request = require('../Model/Friend_Request.js')
const nodemailer = require("nodemailer");
let Sequelize = require('sequelize')
const { Client } = require("pg");
const uuid = require('uuidv4');

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

async function savePost (body) {

    return await post.create(body).then((obj) => {
        console.log(JSON.stringify(obj));
        return JSON.stringify(obj);
    }).catch((err) => {
        return err;
    })
}

async function fetchPost (userid) {

    // var connectionString = "postgres://postgres:qwerty@localhost:5432/facebook_app";

    // return await pg.connect(connectionString,function(err,client) {
    //     if(err){
    //         console.log("not able to get connection "+ err);
    //         //res.status(400).send(err);
    //     } 
    //     client.query('SELECT * FROM Posts Where userid IN ( SELECT friend_id FROM friends WHERE userid = $1)', [userid],function(err,result) {
    //         if(err){
    //             console.log(err);
    //             //res.status(400).send(err);
    //         } else {
    //             console.log(result.rows);
    //         }
    //     });
    //  });
    // const client = new Client({
    //     user: 'postgres',
    //     host: 'localhost',
    //     database: 'facebook_app',
    //     password: 'qwerty',
    //     port: 5432,
    // })

    // client.query('SELECT `post_id`, `post_content` FROM Posts Where userid IN ( SELECT friend_id FROM friends WHERE userid = $1)', [userid],function(err,result) {
    //             if(err){
    //                 console.log(err);
    //                 //res.status(400).send(err);
    //             } else {
    //                 console.log(result.rows);
    //             }
    //         });
    const Op = Sequelize.Op;
    return await friends.findAll({
            where: { 
                    userid : userid
                    }
    }).then(async (obj) => {
            ///console.log(obj);
            let ob = JSON.parse(JSON.stringify(obj));
            //console.log(ob);
            if(ob.length > 0){
                console.log(JSON.stringify(obj));
                console.log(ob[0].friend_id.push(userid));
                return await post.findAll({
                    where : {
                        userid : {
                            [Op.in] : ob[0].friend_id
                        }
                    }
                }).then((obj) => {

                    console.log(JSON.stringify(obj));
                    return JSON.parse(JSON.stringify(obj));
                }).catch(err => console.log(err))
            } else {
                return await post.findAll({
                    where : {
                        userid : {
                            [Op.in] : [userid]
                        }
                    }
                }).then((obj) => {
                    console.log(JSON.stringify(obj));
                    return JSON.parse(JSON.stringify(obj));
                }).catch(err => console.log(err))
            }
    }).catch(err => console.log(err));

    // return await post.findAll(userid).then((obj) => {
    //     console.log(JSON.stringify(obj));
    //     return JSON.stringify(obj);
    // }).catch((err) => {
    //     return err;
    // })
}

async function saveRequest (body) {

    return await friend_request.create(body).then((obj) => {
        console.log(JSON.stringify(obj));
        return JSON.stringify(obj);
    }).catch((err) => {
        return err;
    })
}

//  Accepting Friend Request

async function findFriend(body){
    return await friends.findOne({where :
        {
            userid : body.requestperson_id
        }}).then(async (obj) => {
        console.log(JSON.stringify(obj));
        obj = JSON.parse(JSON.stringify(obj));
        if(obj !== null) {
            obj.friend_id.push(body.userid);
            return await friends.update(
                {friend_id : obj.friend_id},
                {where: {
                    userid : body.requestperson_id
                }}
              )
              .then(function(rowsUpdated) {
                console.log('here');
                return "Updated";
              })
              .catch((err)=> {
                    console.log(err);
              })
        } else {
            console.log("here");
            let arr = [];
            arr.push(body.userid);
            let ob = {
                userid : body.requestperson_id,
                column_id : uuid(),
                friend_id : arr
            }
            return await friends.create(ob)
              .then( async (rowsUpdated)=>{
                console.log('here');
                
              })
              .catch((err)=> {
                    console.log(err);
              })
        }
    }).catch((err) => {
        return err;
    })
}

async function acceptRequest (body) {
    console.log(body.requestperson_id)
    return await findFriend(body).then(async (obj) => {
        let ob = {
            userid : body.requestperson_id,
            requestperson_id : body.userid 
        }
        return await findFriend(ob).then( async (obj) => {
            return await friend_request.destroy({where : body}).then((str)=>{
                console.log("deleted");
                res.status(200).send({message : "Request Accepted"})
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    
}

// ------Ends ------//

async function fetchRequest (body) {

    return await friend_request.findAll({where : body}).then((obj) => {
        console.log(JSON.stringify(obj));
        return JSON.stringify(obj);
    }).catch(err => console.log(err));
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
    fetch : fetch,
    savePost : savePost,
    fetchPost : fetchPost,
    saveRequest : saveRequest,
    acceptRequest : acceptRequest,
    fetchRequest : fetchRequest,
}

module.exports = services;