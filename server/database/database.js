const mongoose = require("mongoose");
 const connectDB =async () =>{
    try{
        await mongoose.connect(process.env.DATABASE,{
             useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDb Connected");
    }
    catch (error){
        console.log(error)
    }
}

module.exports = connectDB;