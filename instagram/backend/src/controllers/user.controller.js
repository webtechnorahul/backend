const followModel=require('../models/follow.model')
const userModel=require('../models/auth.model')
async function followNewUser(req,res) {
    const follower=req.user.id;//userId mean who are follow
    const followee=req.params.followeeId;
    if(followee===follower){
        return res.status(403).json({message:"you can't follow itself"})
    }
    const isFolloweeExist=await userModel.findOne({_id:followee});
    if(!isFolloweeExist){
        return res.status(404).json({message:"user not found you can't follow this user"})
    }
    const isAlreadyFollow=await followModel.findOne({follower,followee});
    if(isAlreadyFollow){
        return res.status(400).json({message:"you are already following this user"})
    }
    const newFollower=await followModel.create({follower,followee});
    console.log(follower,followee)
    res.status(201).json({message:"follow successfully",newFollower})
    
}

module.exports={
    followNewUser
}