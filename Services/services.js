let user = require('../Model/UserRegistration.js')


async function create (body) {
    console.log(body);
    return await user.create(body).then((obj) => {
        console.log(JSON.stringify(obj));
        return obj;
    }).catch((err) => {
        return err;
    })
}

async function login (body) {
    console.log(body);
    return await user.findAll({
        where :body
    }).then((obj) => {
        return JSON.stringify(obj)
    }).catch((err) => {
        return err;
    })
}

let services = {
    create : create,
    login : login
}

module.exports = services;