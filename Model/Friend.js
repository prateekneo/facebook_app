let sequel = require('../Server/server.js')
let user = require('./UserRegistration');
let post = require('./Post');

const friend = sequel.sequelize.define('Friend', {
    column_id:
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
    friend_id:
    {
        type : sequel.Sequelize.ARRAY(sequel.Sequelize.INTEGER),
        allowNull : false,
        foreignKey : true
        
    },
},
{
    timestamps : false
});

// user.hasMany(friend)
// user.belongsTo(friend)

// post.hasOne(friend);
// post.belongsTo(friend);

module.exports = friend