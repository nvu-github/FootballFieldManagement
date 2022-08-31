const Rmyservices = require('./myservice.routes');
const Rdatsan = require('./datsan.routes');
// admin
const Rhomeadmin = require('./admin/homeadmin.routes');
const Rmanageaccount = require('./admin/addaccount.routes');
const Rlogin = require('./login.routes');
const Rsystem = require('./system.routes');

const authMidlleware = require('../app/core/auth.middleware');


function routes(app) {
    // admin
    app.use('/homeadmin', Rhomeadmin);
    // system
    app.use('/api/login', Rlogin);
    app.use(authMidlleware.middleware);

    app.use('/api/system', Rsystem);
    app.use('/api/account', Rmanageaccount);
    app.use('/api/datsan', Rdatsan);

    // user
    app.use('/services', Rmyservices);
    
}

module.exports = routes;