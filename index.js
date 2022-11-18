import express from "express";
const app = express();
import mongoose from "mongoose";
const PORT = 4000;

import {candidate, quation}from "./Modal/modal.js";

const URI=`mongodb+srv://Akash:kcJPhQ9ZGmvkeLMB@cluster0.kxo9afi.mongodb.net/test`
mongoose
  .connect(URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });
 

  app.use(express.json())


app.post("/candidate", (req, res) => {
    var myData = new candidate(req.body);
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.get('/candidate/data',(req,res)=>{
    candidate.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log(data);
        }
    });  
   
   
})

app.post('/candidate/:id',(req, res)=>{
    const data = candidate.findByIdAndUpdate(req.body.id, 
        {Name:req.body.Name}, function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.send(data);
                console.log("Data updated!");
            }
        });  
})


app.listen(PORT, () => {
  console.log(`listening to the port number ${PORT}`);
});
