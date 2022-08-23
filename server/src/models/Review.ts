import mongoose from "mongoose";
import connection from "../database";

const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  text: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = connection.model("Review", reviewSchema);
export { reviewSchema };
export default Review;
