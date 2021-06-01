import mongoose from "mongoose";

// Database schema for product details
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Product = mongoose.model("product", productSchema);

export default Product;
