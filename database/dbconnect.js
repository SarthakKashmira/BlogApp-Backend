//installed for taking values from .env file
const dotenv=require('dotenv');
dotenv.config()

//calling mongoose
const mongoose = require('mongoose');

//creating function and then exporting it
const connectDB=async ()=>{
    try{
      const url=process.env.MONGO_URL;
      await mongoose.connect(`${url}`)
      .then(()=>{ console.log(`Connected! ${mongoose.connection.host}`.bgGreen.white); });
    }
    catch(err){
        console.log(err)
        console.log("Mongo connection error".bgRed.white);
    }
}

module.exports=connectDB