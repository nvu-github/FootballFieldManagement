const datsanModels = require('../models/datsan.models');
const verifyToken = require('../helper/verifyJwt');

class Cdatsan {

    async getList(req, res, next) {
        const dataDatsan = await datsanModels.find({});
        res.setHeader('Content-type', 'application/json');
        res.status(200).json({ dataDatsan });
    }

    insert(req, res, next){
        const token = req.headers['x-access-token'];
        const id = verifyToken(token).dataToken.id;
        const dataBody = req.body.data;
        const dataIns = {
            nameTeam: dataBody['nameTeam'],
            Field: dataBody['Field'],
            Time: dataBody['Time'],
            Note: dataBody['Note'],
            Status: 'choduyet',
            Id_user: id
        }
        const modelsDatsan = new datsanModels(dataIns);
        const resIns = modelsDatsan.save();
        let MessRes = 'Error';
        if (resIns) {
            MessRes = 'Success'
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ MessRes, dataIns });
    }
}

// tao 1 doi tuong instant cua class va export
module.exports = new Cdatsan;