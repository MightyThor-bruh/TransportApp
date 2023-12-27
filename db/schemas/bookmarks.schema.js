import { Schema } from "mongoose";

const BookmarksSchema = new Schema({
  user: {
    type: String,
    ref: 'Users',
  },
  route_number: String,
  route_type: String
});

export default BookmarksSchema