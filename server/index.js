const express = require("express");
const dotenv = require ("dotenv"); 
 const connectDB =  require("./database/database.js");
const contactRouter = require("./routes/contact.js");
const multer = require("multer");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({credentials:true, origin: true})) // Middleware para parsear
    
app.get("/", (req, res) => {
    res.status(200).json("this is the page of the api");
});

// upload image
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "uploads");
        },
        filename: (req, file, cb) => {
            cb(null,"profile.jpg");
        }
    }
)

const upload = multer({storage : storage});
      
app.post("/api/upload", upload.single("file"),(req,res) =>{
    res.status(200).json({status: "success", msg:"image has been uploaded"});
})


//routes
app.use("/api/contact", contactRouter);

app.listen(process.env.PORT,()=>{
connectDB();
    console.log("App is running at port " + process.env.PORT);
});

