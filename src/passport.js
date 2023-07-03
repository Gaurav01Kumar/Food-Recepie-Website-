const LocalStrategy=require('passport-local');
const Register=require('./model/register');
exports.intializingPassport=(passport)=>{
passport.use(new LocalStrategy((username,password,done)=>{
         const user=await User.findOne({username})
}))
}