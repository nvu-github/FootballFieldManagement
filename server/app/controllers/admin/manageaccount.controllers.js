const Mlogin = require('../../models/hethong/login.models');
const sha1 = require('sha1');
const { mutilpleMongooseToObject } = require('../../../util/mongoose');
const { response } = require('express');
const bcrypt = require('bcrypt');

class Cmanageaccount {

    // [GET] /login
    async index(req, res, next){
        const dataAccount = await Mlogin.find({});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ dataAccount });
    }

    async addAccount(req, res, next){
        const dataAdd = req.body;
        const dataReturn = [];
        dataReturn.Mess = '';
        dataReturn.Res = '';

        const checkAccount = await Mlogin.findOne({username: dataAdd['username']});
        const password = await bcrypt.hash(dataAdd['password'], 10);

        if (checkAccount != null) {
            dataReturn.Mess = 'Exists';
        } else {
            const AccountAdd = {
                'username': dataAdd['username'],
                'password': password,
                'timelogin': '',
                'status': '1',
                'permission': dataAdd['permission']
            }
    
            const Mlogins = new Mlogin(AccountAdd);
            const addAccount = await Mlogins.save();
            if (addAccount != null) {
                dataReturn.Mess = 'Success';
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({Mess: dataReturn.Mess});
    }

    async getAccountUpdate(req, res, next){
        const id = req.body;

        const resDel = await Mlogin.findOne({_id: id['id']});
        let ReMess = '';
        let dataReturn = null;

        if (resDel) {
            ReMess = 'Success';
            dataReturn = resDel;
        } else {
            ReMess = 'Fail';
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({Mess: ReMess, data: dataReturn});
    }

    async updateAccount(req, res, next) {
        const data = req.body;
        const query = {'_id': data['data']['id']};
        const password = await bcrypt.hash(data['data']['password'], 10);
        const newData = {
            'username': data['data']['username'],
            'password': password,
            'permission': data['data']['permission']
        };
        let ReMess = '';
        const ResUpdate = await Mlogin.findOneAndUpdate(query, newData, {returnOriginal: false, upsert: true});

        if (ResUpdate) {
            ReMess = 'Success';
        } else {
            ReMess = 'Fail';
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({Mess: ReMess});
    }

    async delAccount(req, res, next){
        const id = req.body;

        const resDel = await Mlogin.deleteOne({_id: id['id']});
        let ReMess = '';

        if (resDel) {
            ReMess = 'Success';
        } else {
            ReMess = 'Fail';
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({Mess: ReMess});
    }
}

module.exports = new Cmanageaccount;