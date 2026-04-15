const ImageKit=require('@imagekit/nodejs')
const {toFile}=require('@imagekit/nodejs')
const postModel=require('../models/post.model');
const likeModel = require('../models/like.model');
const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
});


async function createPost(req,res) {
   const imageName=req.file.originalname.split('.')[0]

   const image=await imagekit.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:imageName,
    folder:"/instagram/post"
   })

   const newPost=await postModel.create({
    caption:req.body.caption,
    imageUrl:image.url,
    user:req.user.id
   })

    res.status(201).json({message:"post created successfuly",post:newPost})
}

async function getAllPost(req,res) {
    const allPost=await postModel.find().populate("user");
    if(allPost==='')
    {
        return res.status(404).json({message:"post are not found"})
    }
    res.status(200).json({message:"found ",post:allPost})
}

async function likePost(req,res) {
    const userId=req.user.id;
    const postId=req.params.postId;
    const isPostExist=await postModel.findOne({_id:postId});
    if(!isPostExist){
        return res.status(404).json({message:"post not found"});
    }
    const isAlreadyLike=await likeModel.findOne({userId,postId});
    if(isAlreadyLike){
        console.log(isAlreadyLike)
        return res.status(409).json({message:"you are already like this post"})
    }
    const likePost=await likeModel.create({
        userId,postId
    })
    console.log(userId,postId);
    res.status(201).json({message:"like successfully",likePost})
}

module.exports={
    createPost,
    getAllPost,
    likePost
}