const express=require('express');
const User=require('../Models/Usermodels');
const bcrypt=require('bcrypt');


exports.register=async (req,res,next)=>{
// console.log(req.body);
  

    try {
        const salt=await bcrypt.genSalt(10);
        const hasedpassword=await bcrypt.hash(req.body.password,salt);
          req.body.password=hasedpassword;


    const reguserinfo=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
         const user=await reguserinfo.save();

         res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.send({sucess:false,message:error});
    }



}



exports.login=async (req,res,next)=>{
    
    try {
        
   
    const user=await User.findOne({email:req.body.email});
    if(!user)
    {
        res.status(404).json("Invalid password or Email");

    }
    const isvalidpassword=await bcrypt.compare(req.body.password,user.password);
    if(!isvalidpassword)
    {
        res.status(404).json("Invalid password or Email");
    }
    res.status(200).json(user);

} catch (error) {
    res.status(500).json(error);
}

  

    
    }




exports.update=async (req,res,next)=>{
    
      
        if(req.body.userid===req.params.id||req.body.isAdmin)
        {

            try {
                
           
            if(req.body.password)
            {
                const salt=await bcrypt.genSalt(10);
                const hashedpassword=await bcrypt.hash(req.body.password,salt);
                req.body.password=hashedpassword;

            }
        }
         catch (error) {
                res.status(403).json(error);
        }

        try {
            
            const user=await User.findByIdAndUpdate(req.params.id,{ $set :req.body });

            res.status(200).json(user);
        } catch (error) {
         
            console.log(error);
        }

        }
        else{
            res.status().json("You are not athorized person to edit profile");
        }
      
    
        
        }



 exports.getallusers=async (req,res,next)=>{

            try {
                
           const users=await User.find({});
           res.send(users);

            } catch (error) {
             res.send(error);   
            }
        
            
     }


 exports.getoneuser=async (req,res,next)=>{
    
          
                try {
                    
               const users=await User.findById(req.params.id);
               const {password,updatedAt,...other}=users._doc;
               res.send(other);
    
                } catch (error) 
                {
                    console.log(error);
                 res.send(error);   
                }
            
                
                }

 exports.deleteUser=async (req,res,next)=>{
                if(req.body.userid===req.params.id|| req.body.isAdmin)
                {
        
                    try {
                        
                   
                   const user=await User.deleteOne(req.body.params);
                   res.status(200).json("Account has been deleted sucessfully");
                }
                 catch (error) 
                 {
                        res.status(403).json(error);
                }
        
            }
            
            res.send("You Can delete only your account ")
                
                }
        

exports.followuser=async (req,res,next)=>{
               if(req.body.userid!=req.params.id)
               {
 

        try {
            
       
               const user=await User.findById(req.params.id);
               const usertofollowing=await User.findById(req.body.userid);

              if(!user.followers.includes(req.body.userid))
              {
                     await user.updateOne({ $push : {followers:req.body.userid}});
                     await usertofollowing.updateOne({ $push : {followings:req.params.id}});

                     res.status(200).json("Followed sucessfully");
              }
              else{
         res.status(403).json("already following");
              }

            } catch (error) {
                console.log(error);
            res.status(403).json(error);
            }
                   
                    
                    }
                    else{
                        res.status(403).json("You cannot follow Yourself");
                    }



                }


exports.unfollowuser=async (req,res,next)=>{
                    if(req.body.userid!=req.params.id)
                    {
      
     
             try {
                 
            
                    const user=await User.findById(req.params.id);
                    const usertofollowing=await User.findById(req.body.userid);
     
                   if(!user.followers.includes(req.body.userid))
                   {
                          await user.updateOne({ $pull : {followers:req.body.userid}});
                          await usertofollowing.updateOne({ $pull : {followings:req.params.id}});
     
                          res.status(200).json("unFollowed sucessfully");
                   }
                   else{
              res.status(403).json("already not following");
                   }
     
                 } catch (error) {
                     console.log(error);
                 res.status(403).json(error);
                 }
                        
                         
                         }
                         else{
                             res.status(403).json("You cannot do this operation");
                         }
     
     
     
                     }               