const { mutilpleMongooseToObject } = require('../../util/mongoose');
const BlogPost = require('../models/collection.models');

class Cabout {

    // [GET] /about
    index(req, res, next){
        BlogPost.find({}).then(abouts => {
            res.render('about_views', {abouts: mutilpleMongooseToObject(abouts), status: 'about', title: 'About'});
        }).catch(next);
    }

}
// tao 1 doi tuong instant cua class va export
module.exports = new Cabout;