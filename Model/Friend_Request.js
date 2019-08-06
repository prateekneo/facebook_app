let sequel = require('../Server/server.js')
let user = require('./UserRegistration');
let post = require('./Post');

const friend_request = sequel.sequelize.define('Friend_Request', {
    request_id:
    {
        type : sequel.Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true
    },
    userid:
    {
        type : sequel.Sequelize.INTEGER,
        allowNull : false,
    },
    requestperson_id:
    {
        type : sequel.Sequelize.INTEGER,
        allowNull : false,
        
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

// user.hasMany(friend)
// user.belongsTo(friend)

// post.hasOne(friend);
// post.belongsTo(friend);

module.exports = friend_request