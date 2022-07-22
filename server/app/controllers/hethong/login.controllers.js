const Mlogin = require('../../models/hethong/login.models');
const sha1 = require('sha1');
const { mongooseToObject } = require('../../../util/mongoose');
const { response } = require('express');
const bcrypt = require('bcrypt');

class Clogin {

    // [GET] /login
    index(req, res, next){
        const name = 'Uc 2';
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
    }

    async checkpass(pass1, pass2) {
        return await bcrypt.compare(pass1, pass2);
    }

    async authentication(req, res, next){
        const dataloginpost = req.body;
        let datalogin = [];
        datalogin.resultUsername = '';
        datalogin.resultPermission = '';
        datalogin.statuslogin = '';
        res.setHeader('Content-Type', 'application/json');

        await Mlogin.findOne({ username : dataloginpost['username']}).then( async (result) => {
            if (result){
                const checkpass = await bcrypt.compare(dataloginpost['password'], result.password);
                
                if (checkpass) {
                    var dataResult = mongooseToObject(result);
                    datalogin.resultUsername = dataResult['username'];
                    datalogin.resultPermission = dataResult['permission'];
                    datalogin.statuslogin = 'success';
                } else {
                    datalogin.statuslogin = 'errpassword';
                }
            } else {
                datalogin.statuslogin = 'notExists';
            }
            res.status(200).json({
                dataloginStatus: datalogin.statuslogin,
                user : {dataloginUsername: datalogin.resultUsername, dataloginPermission: datalogin.resultPermission}
                });
        }).catch(next);
    }

    logout(req, res, next) {
        const name = req.query.username || 'Uc 2';
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
    }
}

module.exports = new Clogin;