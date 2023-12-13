const mongoose = require("mongoose");
const connection = require('../config/database');

const ScheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    arrival_time: {
    type: Date,
    required: true,
  },
  bus_stop: {
    type: String,
    ref: 'bus_stops',
  },
  day_of_week: {
    type: String,
    required: true,
  }
});

module.exports = connection.model('Schedule', ScheduleSchema)