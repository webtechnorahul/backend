const jwt=require('jsonwebtoken')

async function identifyUser(req,res,next) {
   const token=req.cookies.instaToken;
    if(!token){
        return res.status(401).json({message:'unauthorised access'})
    }
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({message:"unauthorised user"})
    } 
    req.user=decoded
    next()
}
module.exports={identifyUser}