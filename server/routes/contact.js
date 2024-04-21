const express = require('express');
const  contact = require("../modules/contact.js");


const route = express.Router();

//get all contact users
route.get("/", async (req, res) => {
    try{
        const allContact = await contact.find();
        res.status(200).json({status: 'success', allContact});
    }catch(error){
        res.status(500).json({status: 'failed', error});
    }
});


//create new contact user
route.post("/create" , async (req, res) => {
    try{
        const newContact = await contact.create(req.body);
        res.status(200).json({status: 'success', newContact});
    }catch(error){
        res.status(500).json({status: 'failed', error});
    }
})

//get single contact user
route.get("/:id" ,async (req,res) => {
    const id =req.params.id;
    try{
        const singleUser = await contact.findById(id);
        res.status(200).json({status: 'success', singleUser});
    }catch(error){
        res.status(500).json({status: 'failed', error}); 
    }
});

//update single contact user
route.put("/update/:id" ,async (req,res) => {
    const id =req.params.id;
    try{
        const updatedUser = await contact.findByIdAndUpdate(id, req.body);
        res.status(200).json({status: 'success', updatedUser});
    }catch(error){
        res.status(500).json({status: 'failed', error:error.message}); 
    }
}); 

//delete single contact user
route.delete("/delete/:id" ,async (req,res) => {
    const id =req.params.id;
    try{
        const removedUser= await contact.findByIdAndDelete(id);
        res.status(200).json({status: 'success', removedUser});
    }catch(error){
        res.status(500).json({status: 'failed', error:error.message}); 
    }
}); 

module.exports = route