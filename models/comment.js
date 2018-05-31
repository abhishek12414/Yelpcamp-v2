const mongoose = require('mongoose');

const commentScheama = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('Comment', commentScheama);
