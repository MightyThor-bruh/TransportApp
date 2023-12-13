const mongoose = require("mongoose");
const connection = require('../config/database');

const RouteSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  driver: {
    type: String,
    required: true,
    ref: 'drivers',
  },
  type: {
    type: String,
    required: true,
    ref: 'transport_types',
  },
  schedule: [{
    type: String,
    required: true,
    ref: 'schedule',
  }]
});

module.exports = connection.model('Route', RouteSchema)