const mongoose=require('mongoose');

const Userschema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:'Blog'
    }]
},{timestamps:true})

const usermodel=mongoose.model('User',Userschema)
module.exports=usermodel