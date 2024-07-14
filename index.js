//npm modeules installation
const morgan=require('morgan');
const dotenv=require('dotenv');
dotenv.config()
const colors=require('colors'); 
const port=process.env.PORT || 5000;                      //port is initialized 
const cors=require('cors');
const express=require('express');
const app=express();                  //initialized instance of express


//database connection configuration
const connectDB=require('./database/dbconnect');
connectDB();

//custom middleware rutes created by us 
const UserRouter=require('./routes/userRoutes')
const BlogRouter=require('./routes/blogRoutes')
//middlewares used are here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/user',UserRouter);      //all requests to /basic will pass from this middleware which will route to another file
app.use('/blog',BlogRouter);
app.use(morgan("dev"))

//basic first page of my backend
app.get("/",(req,res)=>{
    res.status(200).send("Welcome to blog backend");
})


//we can run server directly on express instance
app.listen(port,()=>{
    console.log(`Listening on ${port} server in ${process.env.DEV_MODE} mode`.bgCyan.white);
})