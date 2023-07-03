require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,  
    },
    lastname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    referal:{
        type:String
    },
    phone:{
        type:Number,
        
        required:true,
        unique:true
    },
    email:{
        type:String,
        
        unique:true
    },
    password:{
        type:String,
        
        required:true,
        
    },
    addres: [
        {
          village: {
            type: String,
          },
          city:{
            type:String,
    
          },
          muzaffarpur:{
            type:String,
          },
          pincode:{
            type:Number
          },
          state:{
            type:String,
          },
          country:{
            type:String,
          }
        },
      ],
      orderedProduct:[
        {
            productName:{
                type:String,
            },
            price:{
                type:Number
            },
            quantity:{
                type:Number,
            },
            date:{
                type:String,
            },
        }
      ],
      addToCart:[
        {
            productName:{
                type:String,
            },
            price:{
                type:Number
            },
            quantity:{
                type:Number,
            },
           
        }
      ],
    tokens:[
        {
           token:{
               type:String,
               required:true
           }
        }
    ]
   
})
userSchema.methods.generateAuthToken=async function(){
    try{ 
  const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
  console.log("Reg"+token);
  this.tokens=this.tokens.concat({token:token})
  await this.save();
  return token;
    }catch(e){
console.log(e);
    }
}
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
       // const passwordHash= await bcrypt.hash(password,10)
   // console.log(`the current password is ${this.password}`);
    this.password=await bcrypt.hash(this.password,10);  
    } 
    next();
})
const Register=new mongoose.model("Register", userSchema);
module.exports=Register