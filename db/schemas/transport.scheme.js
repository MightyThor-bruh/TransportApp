import { Schema } from "mongoose";

const TransportRouteSchema = new Schema({
  number: String,
  type: String,
  schedule: [{
    arrival_time: String,
    bus_stop: String,
    day_of_week: String,
  }]
});

const TransportTypeSchema = new Schema({
    name: String,
    type: String
});

export {
    TransportRouteSchema,
    TransportTypeSchema
};