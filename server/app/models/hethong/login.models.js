const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooesDelete = require('mongoose-delete');

const Login = new Schema({
    _id: {type: String, default: ''},
    username: { type: String, require: true, index:true, sparse:true , default: '' },
    password: { type: String, default: ''},
    timelogin: { type: String, default: Date.now },
    status: { type: String, default: 1 },
    permission: { type: String },
    token: {type: String, default: ''},
    refreshToken: {type: String, default: ''}
}, { collection: 'Login', _id: false });

// add plugin
// mongoose.plugin(slug);
// Login.plugin(mongooesDelete);

module.exports = mongoose.model('Login', Login);