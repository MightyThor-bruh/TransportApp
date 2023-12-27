import { Schema } from "mongoose";

const TransportRouteSchema = new Schema({
  number: String,
  type: String,
  schedule: [{
    time: String,
    stop: String,
    weekday: Number,
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