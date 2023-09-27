const mongoose=require("mongoose");

// Schema for product page
const recipieSchema=new mongoose.Schema({
    rname:{
        type:String,
        required:true
    },
   
    category:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        required:true
    },
   
   
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        
    },
})

const Recipie=new mongoose.model("recipies", recipieSchema);
module.exports=Recipie;