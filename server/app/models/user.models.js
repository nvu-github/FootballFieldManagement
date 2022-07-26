const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooesDelete = require('mongoose-delete');

const User = new Schema({
    nameUser: { type: String , default: '' },
    date: { type: String, default: ''},
    sex: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
}, { collection: 'User'});

// add plugin
// mongoose.plugin(slug);
// Login.plugin(mongooesDelete);

module.exports = mongoose.model('User', User);