const postModel=require('../models/post.model')
const ImageKit=require('@imagekit/nodejs')
const jwt=require('jsonwebtoken')
const {toFile}=require('@imagekit/nodejs')

const imagekit=new ImageKit({
    privateKey:process.env.IMAGE_PRIVATE_KEY
})
async function createPostController(req,res) {

    const token=req.cookies.token;
     if (!token) {
        return res.status(401).send('No token found');
    }
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    }
    catch(err){
        return res.status(401).json({message:"unauthroized user"})
    }
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'fileName',
        folder:'hotel'
    });
    const post=await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({message:'post send successfully',post})
}

async function getAllPostController(req,res) {
    const token=req.cookies.token;
    if(!token){
        return res.status(409).json({message:"you are logout"})
    }
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    }
    catch(err){
        return res.status(409).json({message:"unauthorized access"})
    }
    const userID=decoded.id;

    const allPost=await postModel.find({
        user:userID
    })
    res.status(200).json({message:"all post here",allPost})
}

async function getOnePostController(req,res) {
    const postID=req.params.postid;
    const token=req.cookies.token;
    if(!token){
        return res.status(409).json({message:"you are logout"})
    }
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    }
    catch(err){
        return res.status(401).json({message:"unauthorised access"})
    }
    const userID=decoded.id;
    const post=await postModel.findById(postID)
    if(!post){
        return res.status(404).json({message:"not found"})
    }
    const isVerify=post.user.toString()===userID;
    if(!isVerify){
        return res.status(403).json({message:"forbidden"})
    }
    res.status(200).json({message:"post found",post})
}

module.exports={
    createPostController,
    getAllPostController,
    getOnePostController
}