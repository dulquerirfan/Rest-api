const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const key=require('../setup/myurl');
const passport=require('passport');
const jwt=require('jsonwebtoken');

//get the modal
const user=require('../models/user');
//@type : post
//@desc : route for registration
//@route :/api/register
//access : public
router.post('/register',(req,res)=>{
     user.findOne({email:req.body.email})
     .then((person)=>{
          if(person){
             return res.status(400).json({message:'email is already registered'});
          }
          else{
              const newUser=new user({
                  name:req.body.name,
                  userName:req.body.userName,
                  password:req.body.password,
                  email:req.body.email
              })
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err) throw err;
                    // Store hash in your password DB.
                    newUser.password=hash;
                    newUser.save()
              .then((people)=>{
                  res.json(people);
              })
              .catch((err)=>{
                  
                  console.log(err);
    
              })
                });
            });
              
          }
      
     })
})
    //@type :  post
    //@desc : route for login using passport
    //@route : /api/login
    //@access : private
  router.post('/login',passport.authenticate('jwt',{session:false}),(req,res)=>{
     const email=req.body.email;
     const password=req.body.password;
     user.findOne({email})
     .then( (person)=>{
       if(!person){
         res.status(400).json({message:"you haven't registered yet"});
       }
       
       bcrypt.compare(password,user.password)
       .then(isCorrect=>{
         if(isCorrect){
           res.json({suceess:"your able to login"});
          const payload={
             id:user.id,
             username:user.email,
             password:user.password

           };
           jwt.sign(
             payload,
             key.key,
             {expiresIn : 3000},
             (err,token)=>{
               res.json({
                 success:true,
                 token:"Bearer"+token
               })
             }
           );
         }
         else{
           res.status(400).json({passwordError:"password is worong"})
         }
       })
       .catch(err=>{
         console.log(err);
         console.log('problem is here');
       })
     }) 
     .catch(err=>console.log(err));
     
  })
    
module.exports=router;