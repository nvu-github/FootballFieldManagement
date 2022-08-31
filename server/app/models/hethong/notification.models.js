const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema({
    nameUser: { type: String , default: '' },
    Time: { type: Date, default: Date.now},
    Status: { type: String, default: ''},
    Id: { type: String, default: ''},
}, { collection: 'Notification'});

// add plugin
// mongoose.plugin(slug);
// Login.plugin(mongooesDelete);

module.exports = mongoose.model('Notification', Notification);