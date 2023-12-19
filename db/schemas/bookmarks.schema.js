import { Schema } from "mongoose";

const BookmarksSchema = new Schema({
  user: {
    type: String,
    ref: 'Users',
  },
  route: String,
});

export default BookmarksSchema