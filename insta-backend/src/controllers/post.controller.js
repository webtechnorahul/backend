const ImageKit=require('@imagekit/nodejs')
const {toFile}=require('@imagekit/nodejs')
const postModel = require('../models/post.model');

const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
})

async function createNewPost(req,res) {
    
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:req.file.originalname,
        folder:"insta/post"
    })

    const post=postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:req.user.id
    })

    res.status(201).json({message:"post created",post})
}

async function allPost(req,res) {
    const userID=req.user.id;
    
    const post=await postModel.find({user:userID})
    if(!post){
        return res.status(404).json({message:"not found"})
    }
    res.status(200).json({message:'found',post})
}
async function getOnePost(req,res) {
    const userID=req.user.id;
    const postID=req.params.postid;
    
    const post=await postModel.findById(postID)
    if(!post){
        return res.status(404).json({message:"not found"})
    }
    const isVerify=post.user.toString()===userID;
    if(!isVerify){
        return res.status(403).json({message:"forbidden"})
    }

    res.status(200).json({message:'found',post})
}
module.exports={
    createNewPost,
    allPost,
    getOnePost
}