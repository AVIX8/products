import mongoose from "mongoose";
import connection from "../database";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  descr: {
    type: String,
  },
  price: {
    type: Number,
  },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = connection.model("Product", productSchema);

export { productSchema };
export default Product;
