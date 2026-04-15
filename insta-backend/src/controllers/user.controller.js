const followModel = require("../models/follow.model");
const likeModel = require("../models/likes.model");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

async function userFollowRequest(req,res) {
    const followee=req.params.followee;
    const follower=req.user.id;
    if(followee===follower){
        return res.status(200).json({message:"not follow itself"})
    }
    const isFolloweeExist=await userModel.findById(followee)
    if(!isFolloweeExist){
        return res.status(404).json({message:"user not found follow another user"})
    }
    const isAlreadyFollow=await followModel.findOne({
        followee,follower
    })
    if(isAlreadyFollow){
        return res.status(409).json({message:"you are already follow"})
    }
    const follow=await followModel.create({follower,followee})
    res.status(200).json({message:"follow successfully",follow})

}
async function userunFollow(req,res) {
    const follower=req.user.id;
    const followee=req.params.unfollowee;
    const isFollowExist=await followModel.findOne({
        follower,followee
    })
    if(!isFollowExist){
        return res.status(404).json({message:"you are not follow"})
    }
    const unfollowUser=await followModel.findOneAndDelete({follower,followee})
    res.status(200).json({message:"unfollow successfully",unfollowUser})

}
async function acceptFollowUser(req,res) {
    const follower=req.params.follower;
    const followee=req.user.id;
    const isUserFolloweRequest=await followModel.findOne({follower,followee})
    if(!isUserFolloweRequest){
        return res.status(404).json({message:"not found follower request"})
    }
    if(isUserFolloweRequest.status==="accept"){
        return res.status(200).json({message:"already accept friend request"})
    }
    const updateUserFollow=await followModel.findOneAndUpdate({followee,follower},{status:'accept'})
    res.status(201).json({message:"accept following request",updateUserFollow})

}

async function likePost(req,res) {
    const userID=req.user.id;
    const postID=req.params.postId;
    const isPostExist=await postModel.findById(postID)
    if(!isPostExist){
        return res.status(404).json({message:"this post not found"})
    }
    const userAlreadyLiked=await likeModel.findOne({post:postID,user:userID})
    if(userAlreadyLiked){
        return res.status(409).json({message:"you already liked"})
    }
    const userLikedPost=await likeModel.create({
        post:postID,user:userID
    })
    
    res.status(200).json({message:"liked this post",userLikedPost})
}
module.exports={
    userFollowRequest,
    userunFollow,
    likePost,
    acceptFollowUser
}