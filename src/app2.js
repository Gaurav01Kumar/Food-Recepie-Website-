require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;
//const ejs=require("ejs");

const fs=require("fs")
const bcrypt = require("bcrypt");
const Register = require("./model/register");
const Product = require("./model/Product");
const cookieParser = require("cookie-parser");
const multer=require("multer")
const cors=require("cors")
var userExit = false;
require("./db/connect");
const auth = require("./middleware/auth");
const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());
//router for home page
const topSeller = [
  { image: "Image/image6.jpg", name: "Curries" },
  { image: "Image/image7.jpg", name: "Pizza" },
  { image: "Image/image8.jpg", name: "South Indian" },
  { image: "Image/image9.jpg", name: "Naan" },
  { image: "Image/image10.jpg", name: "Indian" },
];
app.get("/", (req, res) => {
  res.render("index", { topSeller: topSeller, logo: userExit });
});

app.get("/cookie", (req, res) => {
  //res.cookie('name','express').send('cookie set')
  // req.session.views=(req.session.views || 0)+1
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
  // req.end(req.session.views+ 'views')
});
//router for login page
app.get("/login", (req, res) => {
  res.render("login", { logo: userExit });
});
// finding the data k
//routing for registration page
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
 
    const user = await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);
    const token = await user.generateAuthToken();
    
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 6000000),
      httpOnly: true,
    });
    if (isMatch) {
      userExit = true;
      res.status(201).redirect("/");
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/register", (req, res) => {
  res.render("register", { logo: userExit });
});
// routing post
app.post("/register", async (req, res) => {
  try {
    // const password = req.body.password;
    const confirmPassword = req.body.cpassword;
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    const User = new Register({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      password: hashPassword,
    });
    const token = await User.generateAuthToken();
    const user = await User.save();
    
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
    });

    if (user) {
      userExit = true;
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

//routing for category page
const categoryList = [
  { image: "Image/image6.jpg", name: "Curries", price: 199 },
  { image: "Image/image7.jpg", name: "Pizza", price: 99 },
  { image: "Image/image7.jpg", name: "Pizza", price: 99 },
  { image: "Image/image7.jpg", name: "Pizza", price: 99 },
  { image: "Image/image8.jpg", name: "South Indian", price: 149 },
  { image: "Image/image9.jpg", name: "Naan", price: 333 },
  { image: "Image/image10.jpg", name: "Indian", price: 333 },
  { image: "Image/image1.jpg", name: "Momo", price: 333 },
  { image: "Image/image2.jpg", name: "Burger", price: 333 },
  { image: "Image/image3.jpg", name: "", price: 333 },
  { image: "Image/image5.jpg", name: "Rolls(veg)", price: 333 },
  { image: "Image/image6.jpg", name: "Non veg", price: 333 },
  { image: "Image/image6.jpg", name: "Salad", price: 333 },
  { image: "Image/image6.jpg", name: "Veg", price: 333 },
  { image: "Image/image6.jpg", name: "Biryani", price: 333 },
];

app.get("/category", async (req, res) => {
  //var {image,name,price}=categoryList;

  //   Product.find({ category}, null, {limit:2}, function (err, docs) {
  //     if (err){
  //         console.log(err);
  //     }
  //     else{
  //         console.log("Third function call : ", docs);
  //     }
  // });

  res.render("category", { categoryList: categoryList, logo: false });
});

app.get("/api/product", auth, (req, res) => {
  
  if (auth) {
    res.render("product");
  }

  res.status(401).redirect("login");
});
// Posting product data
let stroage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload=multer({storage:stroage})

app.post("/api/product",upload.single('image'), async (req, res) => {
  var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
  try {
   
    console.log(final_img)
    const newProduct = new Product({
      pname: req.body.pname,
      mood: req.body.mood,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      image:final_img
    });
    console.log(newProduct);
    const res = await newProduct.save();
  } catch (error) {
    console.log(error);
  }
});
// set data for get list
app.get("/productList", (req, res) => {
  const value = req.query;

  const data = categoryList.filter((item) => {
    return item.name == value.name;
  });

  res.render("productList", { productList: data, logo: false });
});

// Recipie section post and get request
app.get("/food/recipie", (req, res) => {
  res.render("recipie", { logo: false });
});

const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

app.get("/admin", auth, async (req, res) => {
  const token = req.cookies.jwt;
  const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);

  //const user = await Register.findOne({ _id: verifyUser._id });
  
     
  Register.find((err,val)=>{
    if(err){
      console.log(err)
    }
    res.render("admin", {user:val,logo:userExit})
  })
  
});



// 
app.get("/user-profile" , auth,async(req,res)=>{
  const token = req.cookies.jwt;
  const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);

  const user = await Register.findOne({ _id: verifyUser._id });

  res.render("profile",{user:user,logo:userExit})
})

// logout 
app.get("/logout",auth, (req,res)=>{
  cookie = req.cookies;
  for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
          continue;
      }    
      res.clearCookie(prop)
      res.cookie(prop, '', {expires: new Date(0)});
  }
  userExit=false;
  res.redirect("/")
})

app.get("/food-details", (req,res)=>{
   const query=req.query;
   
  res.render("foodDetails",{logo:userExit, value:query})
})

// Cart page for 
app.get("/cart",auth, (req,res)=>{
  res.render("cart", {logo:userExit})
})

// Recipie 
app.get("/foodRecipieForm", (req,res)=>{
  res.render("recipieForm")
})

app.post("/cart",async (req,res)=>{
  const token=req.cookies.jwt;
  const verifyUser=await jwt.verify(token,process.env.SECRET_KEY);
        
       
  const user=Register.findOne({_id:verifyUser._id});
     
user.updateOne({
  addToCart:{
    productName:req.body.Pname,
    price:req.body.price,
    quantity:req.body.quantity
   }
},
function(err,res){
  if(err){
    console.log(err)
  }
  console.log("successfully updated to cart")
} )
 

  
})

app.get("/welcome", (req,res)=>{
  res.render("welcome",{logo:userExit})
})
app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
