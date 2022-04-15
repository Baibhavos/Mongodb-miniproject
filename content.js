const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    complete: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;