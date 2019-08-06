let sequel = require('../Server/server.js')

const user = sequel.sequelize.define('UserRegistration', {
    first_name:
    {
     type: sequel.Sequelize.TEXT,
     allowNull: false
    },
    last_name:
    {
     type: sequel.Sequelize.TEXT,
     allowNull: true
    },
    user_email:
    {
     type: sequel.Sequelize.TEXT,
     allowNull: false
    },
    user_password:
    {
     type: sequel.Sequelize.TEXT,
     allowNull: false
    },
    email_verified_status:
    {
        type : sequel.Sequelize.BOOLEAN,
        allowNull : false
    },
    dob:
    {
        type: sequel.Sequelize.DATE,
        allowNull: false
    },
    user_registration_id : {
        type : sequel.Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true
    },
    otp_requested : {
        type : sequel.Sequelize.INTEGER,
        allowNull : false,
    }
},
{
    timestamps : false
});



module.exports = user