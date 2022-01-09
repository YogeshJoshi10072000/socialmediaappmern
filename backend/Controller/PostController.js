const express=require('express');
const Post=require('../Models/UserPost');
const bcrypt=require('bcrypt');
const User=require('../Models/Usermodels');

exports.createpost=async (req,res,next)=>{

    try {
        
const post=new Post(req.body);
        const newpost=await post.save();
        res.status(200).json(newpost);

    } catch (error) {
        
        console.log(error);
        res.send(500).json(error);
    }
  

    


}


exports.getallpost=async (req,res,next)=>{
try {
    

const posts=await Post.find({});

res.status(200).json(posts);
} catch (error) {
    res.status(500).json(error);
    
}
    


}


exports.getapost=async (req,res,next)=>{

    try {
        
   
    const posts=await Post.findById(req.params.id);
    
    res.status(200).json(posts);
    
} catch (error) {

    res.status(500).json(error);
}     
    
    
    }


exports.updatepost=async (req,res,next)=>{

    try {
        
   
 const post=await Post.findById(req.params.id);

 if(post.userid===req.body.userid)
 {
     await post.updateOne({$set:req.body});

     res.status(200).json("Your Post updates sucessfully");

 }
 else{
     res.status(403).json("You can update only your post");
 }

}
 catch (error)
 {
        res.ststus(500).json(error);
}
    


}


exports.deletepost=async (req,res,next)=>{

    try {
        
   
        const post=await Post.findById(req.params.id);
       
        if(post.userid===req.body.userid)
        {
            await post.deleteOne();
       
            res.status(200).json("Your Post delted sucessfully");
       
        }
        else{
            res.status(403).json("You can delte only your post");
        }
       
       }
        catch (error)
        {
               res.ststus(500).json(error);
       }


}




exports.likepost=async (req,res,next)=>{

    try {
        
   
        const post=await Post.findById(req.params.id);
       
        if(!post.likes.includes(req.body.userid))
        {
            await post.updateOne({$push:{likes:req.body.userid}});
       
            res.status(200).json("post has been sucessfully liked");
       
        }
        else{
            res.status(403).json("You already liked the post");
        }
       
       }
        catch (error)
        {
               res.ststus(500).json(error);
       }


}


exports.dislikepost=async (req,res,next)=>{

    try {
        
   
        const post=await Post.findById(req.params.id);
       
        if(!post.likes.includes(req.body.userid))
        {
            await post.updateOne({$pull:{likes:req.body.userid}});
       
            res.status(200).json("post has been sucessfully disliked");
       
        }
        else{
            res.status(403).json("You already disliked the post");
        }
       
       }
        catch (error)
        {
               res.ststus(500).json(error);
       }


}



exports.timeline=async (req,res,next)=>{

   try {
       
const user=await User.findById(req.body.userid);

const thisuserposts= await Post.find({userid:user._id});

const friendposts=await  Promise.all(


    user.followings.map((id)=>{
        Post.find({userid:id});
    })
)

res.status(200).json(thisuserposts.concat(...friendposts));




   } catch (error) {
       console.log(error);
       res.status(500).json(error);
   }



}
