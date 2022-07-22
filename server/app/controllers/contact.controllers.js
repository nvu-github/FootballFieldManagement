const BlogPost = require('../models/collection.models');
const { mutilpleMongooseToObject } = require('../../util/mongoose');

class Ccontact {

    constructor(){
        
    }

    // [GET] /home
    index(req, res, next){

        BlogPost.find({}).then(news => {
            let data = {
                news: mutilpleMongooseToObject(news), 
                status: 'contact', 
                title: 'Contact'
            };
            res.render('contact_views', data);
        }).catch(next);
    }
}
// tao 1 doi tuong instant cua class va export
module.exports = new Ccontact;