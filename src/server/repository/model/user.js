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
    deviceId:{
        type:String,
    }
})
module.exports=new mongoose.model("user",userSchema);