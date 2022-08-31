const { mutilpleMongooseToObject } = require('../../util/mongoose');
const Login = require('../models/hethong/login.models');
const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const Notification = require('../models/hethong/notification.models');

class Csystem {

    constructor(){
        
    }

    // [POST] /api/system/change-status
    async changeStatus(req, res, next) {
        const { id } = req.body;
        const query = {'_id': id};
        let Res = 'Error';
        console.log(id)
        const changeStatus = await Notification.findOneAndUpdate(query, {'Status': 'daxem'}, {returnOriginal: false, upsert: true});
        console.log(changeStatus);
        if (changeStatus) {
            Res = 'Success';
        }
        res.status(200).json({Res});
    }

    // [GET] /api/system/getinfo
    async getInfoUser(req, res, next){
        try {
            const id = jwt.verify(req.headers['x-access-token'], process.env.ACCESS_SECRET_KEY_JWT).dataToken.id;
            const dataLogin = await Login.findOne({_id: id});
            const dataUser = await User.findOne({_id: id});
            const dataUserLogin = {
                nameUser: dataUser['nameUser'],
                permission: dataLogin['permission'],
                token: req.headers['x-access-token'],
            };
            res.status(200).json({dataUserLogin});
        } catch (e) {
            console.log(e);
        }
    }

    search(req, res){
        res.resend('Noi dung search');
    }
}

// tao 1 doi tuong instant cua class va export
module.exports = new Csystem;