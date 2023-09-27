const jwt=require("jsonwebtoken")
 const Register=require("../repository/model/user");
// const auth=async(req,res,next)=>{
// try{
// const token=req.cookie.jwt;
// const verify=jwt.verify(token,process.env.SECRET_KEY);
// console.log(verify);
// const user=await Register.findOne({_id:verify._id})
// next(); 
// }catch(error){
//  console.log(error);
// }
// }
// module.exports=auth;

const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        
       if(!token){
        res.redirect("/welcome")
        return res.status(403).send("A token is required for authentication");
       }
        const verifyUser=await jwt.verify(token,process.env.SECRET_KEY);
        
       
        const user=Register.findOne({_id:verifyUser._id});
           
        
         next();
         
    
    } catch (error) {
        
        console.log(error)
        
    }
}
module.exports=auth;