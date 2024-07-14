const mongoose = require('mongoose');
const blogmodel=require('../models/blogmodel');
const usermodel = require('../models/usermodel');

exports.getAllBlogs=async (req,res)=>{
    try{
        const blogs=await blogmodel.find({}).populate("user");
        if(!blogs.length){
            return res.send({
                message:"No blog found!!",
                success:false,
                blogs
            })
        }
        return res.status(200).send({
            message:"These are your blogs!!",
            BlogCount:blogs.length,
            success:true,
            blogs
        })

    }catch(err)
    {
        return res.status(500).send({
            message:"Error is fetching the blogs!!",
            success:false,
        })
    }
}

exports.createBlog=async (req,res)=>{
try{
    const {title,description,image,user}=req.body;
    if(!title || !description || !image  || !user){
        return res.status(400).send({
            message:"Please provide the details!!",
            success:false
        })
    }
    const existingUser=await usermodel.findById(user).exec();
    if(!existingUser){
        return res.send({
            message:"Unable to find user!!",
            success:false
        })
    }
    //start session in mongoose to upadte both the tables
    const blog=new blogmodel({title,description,image,user});
    const session=await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog);
    await existingUser.save({session});
    await session.commitTransaction();
    await blog.save();


    return res.status(200).send({
        message:"New blog created!!",
        success:true,
        blog
    })
}catch(err)
{
    return res.status(500).send({
        message:"Error while creating the blog!!",
        success:false,
        err
    })
}
}

exports.updateBlog=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id);
        const {title,description,image}=req.body;
        const blog=await blogmodel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(200).send({
            message:"Blog updated successfullly!!",
            success:true,
            blog
        })
    }catch(err)
    {
        return res.status(200).send({
            message:"Error while updating blog!!",
            success:false,
            err
        })
    }
}

//important to understand to delete from the referneced table also
exports.deleteBlog=async (req,res)=>{
    try{
        const blog=await blogmodel.findByIdAndDelete(req.params).populate("user");
        console.log(blog.user.blogs);
        await blog.user.blogs.pull(blog._id);
        await blog.user.save();
        return res.status(200).send({
            message:"Blog deleted successfully!!",
            success:true,
        })

    }catch(err)
    {
        return res.status(500).send({
            message:"Error while deleting blog!!",
            success:false,
            err
        })
    }
}

exports.getBlogbyId=async (req,res)=>{
    try{
        const {id}=req.params;
        console.log(id);
        const blog=await blogmodel.findById({_id:id});
        if(!blog)
        {
            return res.status(400).send({
                message:"Cannot get blog by that id",
                success:false,
                blog
            })
        }
        return res.status(200).send({
            message:"Your blog is displayed!!",
            success:true,
            blog
        })
    }catch(err)
    {
        return res.status(500).send({
            message:"Error while getting blog by id",
            success:false,
            err
        })
    }
}

exports.getUserBlogbyId=async (req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const userBlog=await usermodel.findById(id).populate("blogs");
        console.log(userBlog);
        if(!userBlog.blogs.length){
            return res.send({
                message:"Blog not found with this id",
                success:false
            })
        }
        return res.status(200).send({
            message:"Blogs with the user id are",
            success:true,
            userBlog
        })
    }catch(err)
    {
        return res.status(500).send({
            message:"Failed to fetch the user by id!!",
            success:false,
            err
        })
    }

}
