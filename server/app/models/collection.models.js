const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooesDelete = require('mongoose-delete');

const Colection = new Schema({
    title: { type: String, default: '' },
    time: { type: Date, default: Date.now },
    url: { type: String, default: '' },
    slug: { type: String, slug: 'title', unique: true },
}, { collection: 'Colection' });

// add plugin
mongoose.plugin(slug);
Colection.plugin(mongooesDelete);

module.exports = mongoose.model('Colection', Colection);