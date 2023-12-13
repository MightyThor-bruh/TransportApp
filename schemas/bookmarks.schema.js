const mongoose = require("mongoose");
// const connection = require('../config/database');

const BookmarksSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    ref: 'Users',
  },
  route: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Bookmarks', BookmarksSchema)