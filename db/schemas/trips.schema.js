import { Schema } from "mongoose";

const TripsSchema = new Schema({
  driver: String,
  route: String,
  status: String,
});

const StatusSchema = new Schema({
  name: String,
});

export {
  TripsSchema,
  StatusSchema
};