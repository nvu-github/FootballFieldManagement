const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Datsan = new Schema({
    nameTeam: { type: String , default: '' },
    Field: { type: String, default: ''},
    Time: { type: String, default: ''},
    Note: { type: String, default: ''},
    Status: { type: String, default: ''},
    Id_user: { type: String, default: ''},
}, { collection: 'Datsan'});

// add plugin
// mongoose.plugin(slug);
// Login.plugin(mongooesDelete);

module.exports = mongoose.model('Datsan', Datsan);