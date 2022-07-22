const { mutilpleMongooseToObject } = require('../../util/mongoose');
const BlogPost = require('../models/collection.models');

class Cmyservice {

    // [GET] /about
    index(req, res, next){
        BlogPost.find({}).then(abouts => {
            const data = {abouts: mutilpleMongooseToObject(abouts), status:'service', title: 'My service'};
            res.render('myservice_views', data);
        }).catch(next);
    }

}
// tao 1 doi tuong instant cua class va export
module.exports = new Cmyservice;