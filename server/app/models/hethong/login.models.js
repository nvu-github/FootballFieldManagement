const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooesDelete = require('mongoose-delete');

const Login = new Schema({
    username: { type: String, require: true, index:true, sparse:true , default: '' },
    password: { type: String, default: ''},
    timelogin: { type: String, default: Date.now },
    status: { type: String, default: 1 },
    permission: { type: String },
}, { collection: 'Login' });

// add plugin
// mongoose.plugin(slug);
// Login.plugin(mongooesDelete);

module.exports = mongoose.model('Login', Login);