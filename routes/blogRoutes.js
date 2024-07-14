const express=require('express');
const { createBlog, updateBlog, deleteBlog , getBlogbyId ,getAllBlogs,getUserBlogbyId} = require('../controllers/blogController');
const router=express.Router();

router.get('/allblogs',(req,res)=>getAllBlogs(req,res));

router.post('/createblog',createBlog);

router.put('/updateblog/:id',updateBlog);

router.delete('/deleteblog/:id',deleteBlog);

router.get('/getblog/:id',(req,res)=>getBlogbyId(req,res));

router.get('/getuserblog/:id',(req,res)=>getUserBlogbyId(req,res));

module.exports=router