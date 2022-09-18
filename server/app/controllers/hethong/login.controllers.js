const Mlogin = require('../../models/hethong/login.models');
const { mongooseToObject } = require('../../../util/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersModel = require('../../models/user.models');
const sha1 = require('sha1');

class Clogin {

    async refreshToken(req, res, next){
        try {
            const dataReqRefresh = jwt.verify(req.body.refreshToken, process.env.REFRESH_SECRET_KEY_JWT); 
            const dataToken = dataReqRefresh.dataToken;
            const token = jwt.sign({dataToken}, process.env.ACCESS_SECRET_KEY_JWT, {
                expiresIn: process.env.TIME_ACCESS_TOKEN,
            });
            const tokenRefresh = jwt.sign({dataToken}, process.env.REFRESH_SECRET_KEY_JWT, {
                expiresIn: process.env.TIME_REFRESH_TOKEN,
            });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({token: token, tokenRefresh: tokenRefresh});
        } catch (err) {
            res.status(401).json({err});
        }
        
    }

    async checkpass(pass1, pass2) {
        return await bcrypt.compare(pass1, pass2);
    }

    async authentication(req, res, next){
        const dataloginpost = req.body;
        let datalogin = [];
        datalogin.resultUsername = '';
        datalogin.resultPermission = '';
        datalogin.token = '';
        datalogin.refreshtoken = '';
        datalogin.statuslogin = '';
        res.setHeader('Content-Type', 'application/json');

        await Mlogin.findOne({ username : dataloginpost['username']}).then( async (result) => {
            if (result){
                const checkpass = await bcrypt.compare(dataloginpost['password'], result.password);
                
                if (checkpass) {
                    var dataResult = mongooseToObject(result);
                    const id = dataResult['_id'];
                    const dataToken = {id: id, permission: dataResult['permission']}
                    const token = jwt.sign({dataToken}, process.env.ACCESS_SECRET_KEY_JWT, {
                        expiresIn: process.env.TIME_ACCESS_TOKEN,
                    });
                    const tokenRefresh = jwt.sign({dataToken}, process.env.REFRESH_SECRET_KEY_JWT, {
                        expiresIn: process.env.TIME_REFRESH_TOKEN,
                    });
                    const saveToken = await Mlogin.findOneAndUpdate({'_id': id}, {'token': token, 'refreshToken': tokenRefresh}, {returnOriginal: false, upsert: true});
                    if (saveToken) {
                        datalogin.resultUsername = dataResult['username'];
                        datalogin.resultPermission = sha1(dataResult['permission']);
                        datalogin.statuslogin = 'success';
                        datalogin.token = token;
                        datalogin.refreshtoken = tokenRefresh
                    }
                } else {
                    datalogin.statuslogin = 'errpassword';
                }
            } else {
                datalogin.statuslogin = 'notExists';
            }
            res.status(200).json({
                dataloginStatus: datalogin.statuslogin,
                user : {
                    dataloginUsername: datalogin.resultUsername, 
                    dataloginPermission: datalogin.resultPermission, 
                    dataloginToken: datalogin.token, 
                    dataloginRefreshToken: datalogin.refreshtoken
                }
                });
        }).catch(next);
    }

    async register(req, res) {
        const dataSend = req.body;
        let mess = 'Error';
        const dataUser = {
            nameUser: dataSend.data.nameUser
        }

        const Musers = new UsersModel(dataUser);
        const resSave = await Musers.save();

        if (resSave) {
            const id = resSave['_id'].toString();
            const password = await bcrypt.hash(dataSend.data.password, 10);
            const checkLogin = await Mlogin.findOne({'username': dataSend.data.username});
            if (checkLogin) {
                mess = 'Exists';
            } else {
                const dataLogin = {
                    _id: id,
                    username: dataSend.data.username,
                    password: password,
                    timelogin: '',
                    status: 1,
                    permission: 2,
                    token: '',
                    refreshtoken: ''
                }
                const Mlogins = new Mlogin(dataLogin);
                const resLogin = await Mlogins.save();
    
                if (resLogin) {
                    mess = 'Success';
                }  
            }
        }

        res.status(200).json({Mess: mess});
    }
}

module.exports = new Clogin;