const usermodel=require('../models/usermodel')
//to hash passsword we have to install some libraries
const bcrypt = require('bcrypt');
const saltRounds = 10;



exports.getAllUser=async (req,res)=>{
  try{
   const users=await usermodel.find({});
   res.status(201).send({
      length:users.length,
      success:true,
      users
   })
  }catch(err)
  {
   return res.status(500).send({
      message:"cannot find users",
      success:false
   });
  }
}

exports.createUser=async (req,res)=>{
   try{
      let {username,email,password}=req.body;
      if(!username || !email || !password)
      {
         return res.status(400).send({
            message:"Details not filled properly.Please fill the details!!",
            success:false
         })
      }
      const existingUser=await usermodel.findOne({email});
      if(existingUser){
         return res.status(400).send({
            message:"user already exists.Please login!!",
            success:false
         })
      }
      const hashedPassword=await bcrypt.hash(password, saltRounds);
      const user=new usermodel({username,email,password:hashedPassword});
      await user.save();
      return res.status(201).send({
         message:"User created",
         success:true,
         user
      })
   }
   catch(err)
   {
      console.log(err);
      return res.status(500).send("Error in register-user");
   }
}


exports.loginUser=async (req,res)=>{
   try{
      const {email,password}=req.body;
      console.log(req.body);
      //checking if the details are provided or not
      if(!email || !password){
         return res.send({
            message:"Please provide the details",
            success:false
         })
      }
      //checking if the user exists or not
      const user=await usermodel.find({email});
      if(!user.length){
         return res.send({
            message:"User does not exists.Please register first.",
            success:false
         })
      }
      //matching the password with the daatbase
      const isMatch=await bcrypt.compare(password,user[0].password);
      if(!isMatch){
         return res.send({
            message:"Password does not match.Please provide the correct password",
            success:false
         })
      }

      return res.send({
         message:"You are being logged in.",
         success:true,
         user
      })
   }catch(err)
   {
      console.log(err);
      return res.status(400).send({
         message:"Failed to login!!",
         success:false
      })
   }
    
}

exports.getOneUser=async(req,res)=>{
   try{
   const {id}=req.params;
   const user=await usermodel.findById(id);
   console.log(user)
   return res.status(200).send(user);
   }catch(err)
   {
      return res.status(500).send("Cannot get user!!")
   }
}