const mongoose=require("mongoose");

const ingredientSchema=new mongoose.Schema({
    recipieId:{type:mongoose.Schema.Types.ObjectId,ref:"recipie"},
    name:{type:string}
})