// const BlogPost = require('../models/collection.models');
const { mutilpleMongooseToObject } = require('../../../util/mongoose');

class Chomeadmin {

    // [GET] /home
    index(req, res, next){

        // BlogPost.find({}).then(news => {
            let data = {
                // news: mutilpleMongooseToObject(news), 
                status: 'home', 
                title: 'Home'
            };
            res.render('admin/homeadmin_views', data);
        // }).catch(next);
    }

    search(req, res){
        res.resend('Noi dung search');
    }
}

// tao 1 doi tuong instant cua class va export
module.exports = new Chomeadmin;