const express=require('express');
const router = express.Router();       //to route requests to another file
const {getAllUser,createUser, loginUser,getOneUser}=require('../controllers/userController');

//get all users
router.get('/alluser',(req,res)=>getAllUser(req,res));

//create a user
router.post('/register',(req,res)=>createUser(req,res));

//login a user
router.post('/login',(req,res)=>loginUser(req,res));                           //both way of calling function is okk

router.get('/oneuser/:id',(req,res)=>getOneUser(req,res));

module.exports=router