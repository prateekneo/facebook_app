let user = require('../Controller/User.js')

module.exports = (app) => {
    console.log('prateek');
    app.post('/Signup/create', user.create)
    app.get('/sent', user.send_mail);
    app.post('/Signin', user.signin);
    //app.get('/get/:userid', user.get);
    //app.post('/edit', user.edit);
    //app.post('/delete', user.del);
    //app.get('/filter', user.filter);

}