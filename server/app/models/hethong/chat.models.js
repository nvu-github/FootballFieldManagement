const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({
    nameUser: { type: String , default: '' },
    contentChat: { type: String , default: '' },
    Time: { type: Date, default: Date.now},
    Id: { type: String, default: ''},
    IdChat: { type: String, default: '' }
}, { collection: 'Chat'});

module.exports = mongoose.model('Chat', Chat);