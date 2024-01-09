const mongoose=require("mongoose");

const OrderItem=new mongoose.Schema({
    products:[
      {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
      }
    ],
    price:{
        type:Number,
        default:0,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderStatus:{
        type:String
    }
})