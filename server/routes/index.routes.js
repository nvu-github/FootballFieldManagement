const Rhome = require('./home.routes');
const Rcollection = require('./collection.routes');
const Rabout = require('./about.routes');
const Rmyservices = require('./myservice.routes');
const Rblog = require('./blog.routes');
const Rcontact = require('./contact.routes');
const Rhomeadmin = require('./admin/homeadmin.routes');
const Rmanageaccount = require('./admin/addaccount.routes');
const Rlogin = require('./login.routes');

const authMidlleware = require('../app/core/auth.middleware');


function routes(app) {
    // admin
    app.use('/homeadmin', Rhomeadmin);

    // system
    // app.use('/api/getfile', Rlogin);
    app.use('/api/login', Rlogin);
    app.use(authMidlleware.middleware);
    app.use('/api/account', Rmanageaccount);

    // user
    app.use('/contact', Rcontact);
    app.use('/blog', Rblog);
    app.use('/services', Rmyservices);
    app.use('/about', Rabout);
    app.use('/collection', Rcollection);
    app.use('/home', Rhome);
    app.use('/', Rhome);
}

module.exports = routes;