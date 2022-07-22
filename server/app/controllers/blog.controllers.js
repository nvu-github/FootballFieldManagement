const BlogPost = require('../models/collection.models');
const { mutilpleMongooseToObject } = require('../../util/mongoose');

class Cblog {

    constructor(){
        
    }

    // [GET] /home
    index(req, res, next){

        BlogPost.find({}).then(news => {
            let data = {
                news: mutilpleMongooseToObject(news), 
                status: 'blog', 
                title: 'Blog'
            };
            res.render('blog_views', data);
        }).catch(next);
    }

    search(req, res){
        res.resend('Noi dung search');
    }
}
// tao 1 doi tuong instant cua class va export
module.exports = new Cblog;