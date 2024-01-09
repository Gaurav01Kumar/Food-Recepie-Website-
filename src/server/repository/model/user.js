const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    email:{
        type:String,
        RegExp:"@.",
        required:true,
    },
    password:{
        type:String,
        min:"8",
        max:"8",
    },
    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
     
      phone: {
        type: Number,
    
        required: true,
        unique: true,
      },
      addres: [
        {
          city: {
            type: String,
          },
    
          pincode: {
            type: Number,
          },
          state: {
            type: String,
          },
          country: {
            type: String,
            default: "India",
          },
        },
      ],
    deviceId:{
        type:String,
    },
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
},)
module.exports=new mongoose.model("User",userSchema);