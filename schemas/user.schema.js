const mongoose = require("mongoose");
const connection = require('../config/database');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  role: [{
    type: String,
    ref: 'Roles'
  }]
})

module.exports = connection.model('Users', UserSchema)