const mongoose = require("mongoose");

// Schema for product page
const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  
  
});

const Product = new mongoose.model("products", productSchema);
module.exports = Product;
