
require('dotenv').config();
//const bcryptjs = require('bcryptjs');
const express=require('express');
require("./db/connect");
const port= process.env.PORT || 3000;
const path=require("path")
const bcrypt=require("bcryptjs")
const Register=require("./model/register.js");
const auth=require("./middleware/auth")
const app=express();
console.log(process.env.SECRETE_KEY)
app.use(express.json());
const templates_path=path.join(__dirname,"./templates/views");
app.use(express.static(path.join(__dirname,"./public")))
app.set("view engine","hbs");
app.set("views",templates_path);
app.use(express.urlencoded({extends:false}));
app.get("/",(req,res)=>{
    res.render("index",{logo:user});
})
app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register", async (req,res)=>{
try{
    if(req.body===null){
        res.alert("fiil form")
    }
    const password= req.body.password
    const cpassword=req.body.cpassword
    if(password===cpassword){
        const Client= new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            gender:req.body.gender,
            referal:req.body.referal,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password
       
        })
        //Concept 
        const token=await Client.generateAuthToken();
        res.cookie("jwt",token,{
        expires:new Date(Date.now()+10000),
        httpOnly:true });
        res.cookie();
        console.log(cookie);
        const user=await Client.save();
        res.status(201).render("index");
    }else{
        res.alert("Error")
    }
 

}catch(e){
res.send(e);
}
})
app.get("/login", (req,res)=>{
    res.render("login")
})
app.post("/login", async (req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.passwords;
        const Login= await Register.findOne({email:email})
        const isMatch=await bcrypt.compare(password,Login.password);
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+10000),
            httpOnly:true });
        const token=await Login.generateAuthToken();
        console.log(token)
        if(isMatch){
            res.render("index");
        }
        }catch(e){
            res.send(e);
        }
    
    
})
// const jwt=require("jsonwebtoken");

// const createToken= async()=>{
// const Token=await jwt.sign({_id:"6258d0f563bde0ec21cd108e"},"mynameisgaueav")
// console.log(Token);
// const userVar=await jwt.verify(Token,"mynameisgaueav")
// console.log(userVar);
// }
// createToken();
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})