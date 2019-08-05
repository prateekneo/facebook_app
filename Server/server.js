let express = require('express')
const bodyParser = require('body-parser');
let app = express()

let cors = require('cors')

var passport = require("passport");


const Sequelize = require('sequelize');

    const sequelize = new Sequelize('facebook_app', 'postgres', 'qwerty', {
    host: 'localhost',
    dialect: 'postgres'
    });

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.')  
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    let sequel = {
        Sequelize : Sequelize,
        sequelize : sequelize
    }

    module.exports = sequel;
    
    app.use(express.json( { extended: false } ))
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    app.use('/Signup/create', require('../api/signup'))
    //app.use('/sent', require('../api/sent'));
    app.use('/Signin', require('../api/signin'));
    app.use('/VerifyOtp', require('../api/verifyotp'));
    app.use('/ForgotPassword', require('../api/ForgotPassword'));
    app.use('/ForgotPasswordCheckOtp', require('../api/ForgotPasswordCheckOtp'));
    app.use('/SaveNewPassword', require('../api/SaveNewPassword'));
    app.use('/Home', require('../api/Home'));
    app.use('/SavePost', require('../api/SavePost'));


   app.get('/', (req, res) => res.send('api running'));
app.listen(3005);