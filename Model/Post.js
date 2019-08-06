let sequel = require('../Server/server.js')
let user = require('./UserRegistration');

const post = sequel.sequelize.define('Post', {
    post_id:
    {
        type : sequel.Sequelize.TEXT,
        allowNull : false,
        primaryKey : true
    },
    userid:
    {
        type : sequel.Sequelize.TEXT,
        allowNull : false,
        foreignKey : true
    },
    post_content:
    {
        type: sequel.Sequelize.TEXT,
        allowNull: true
    },
    post_image_path:
    {
        type: sequel.Sequelize.TEXT,
        allowNull: true
    },
    likes:
    {
     type: sequel.Sequelize.INTEGER,
     allowNull: false
    },
    timestamp :
    {
        type : 'TIMESTAMP',
        defaultValue : sequel.Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false   
    }
},
{
    timestamps : false
});

    // user.hasMany(post)
    // user.belongsTo(post)

module.exports = post