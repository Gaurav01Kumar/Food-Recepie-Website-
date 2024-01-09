const mongoose = require("mongoose");

const reviews = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  rating: { type: Number, required: true,default:0 },
  message:{type:String}
});

// Schema for product page
const productSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  // image: {
  //   data: Buffer,
  //   contentType: String,
  // },
  images: [
    {
      imageUrl: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    //required: true,
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
  resturantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resturant",
  },
  reviewsId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Reviews"
  }
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
