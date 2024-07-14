const mongoose=require('mongoose');
const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    image:{
        type:String,
        required:[true,"Image is required"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,"user id is required"]
    }
},{timestamps:true});

const blogmodel=mongoose.model("Blog",BlogSchema);
module.exports=blogmodel