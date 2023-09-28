const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
