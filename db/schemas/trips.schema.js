const mongoose = require("mongoose");
const connection = require('../config/database');

const TripsSchema = new mongoose.Schema({
  driver: {
    type: String,
    required: true,
    ref: 'drivers',
  },
  route: {
    type: String,
    required: true,
    ref: 'Route',
  },
  status: {
    type: String,
    required: true,
    ref: 'statuses',
  }
});

module.exports = connection.model('Trips', TripsSchema)