let express = require('express')
const bodyParser = require('body-parser');
let app = express()

let cors = require('cors')

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
    app.use(express.json())
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
   require('../Routes/routes.js')(app);
app.listen(3005);