const mongoose=require("mongoose");

// Schema for product page
const recipieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{type:String},
    images:[
        {
            type:Array
        }
    ],
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
})

const Recipie=new mongoose.model("recipies", recipieSchema);
module.exports=Recipie;