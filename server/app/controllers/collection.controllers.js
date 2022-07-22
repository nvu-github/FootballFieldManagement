const BlogPost = require('../models/collection.models');
const { mongooseToObject } = require('../../util/mongoose');
const { mutilpleMongooseToObject } = require('../../util/mongoose');

class Rcollection {

    async index(req, res, next){
        var data = await getdata();
        res.render('collection_views.ejs',{data:data, status: 'colection', title: 'Collection'});
    }

    // [GET ROW DATA] /news/:slug
    showData(req, res, next){
        BlogPost.findOne({ slug: req.params.slug}).then(result => {
            res.render('hethong/chitiet_views', {result: mongooseToObject(result)});
        }).catch(next);
    }

    // [INSERT] news/insert
    insertdata(req, res, next){
        const Mnew = new BlogPost(req.body);
        Mnew.save().then(()=>res.redirect('/')).catch(()=>res.send('error'));
    }

    // [EDIT] /news/:id/edit
    async editData(req, res, next){
        const data = await getdata();
        BlogPost.findById(req.params.id).then(result => {
            res.render('news', {dataset: mongooseToObject(result), data: data});
        }).catch(next);
    }

    // [DELETE] /news/:id/delete
    delete(req, res, next){
        BlogPost.deleteOne({_id:req.params.id}).then(() => {
            res.redirect('back');
        }).catch(next);
    }
}

async function getdata(){
    var data;
    await BlogPost.find({}).then(result => {
        data = mutilpleMongooseToObject(result);
    }).catch(console.log('error'));
    return data;
} 

module.exports = new Rcollection