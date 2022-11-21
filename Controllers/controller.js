import express from "express";
const app = express();

import { candidate, question } from "../Modal/modals.js";

export const  createCandidate=async(req, res) => {
    var myData = new  candidate(req.body);
    console.log(myData);
    await myData
      .save()
      .then(() => {
         res.send("new candidate added to database");
      })
      .catch(() => {
        res.status(400).send("unable to save to database");
      });
  }

  export const getCandidateData=  (req, res) => {
     candidate.find(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log(data);
      }
    })
    // .catch( (err)=> {err});
  }

  

  export const updateCandidateInfo=  (req, res) => {
    var myquery = { firstName: "Lucky" };
    var newvalues = { $set: { firstName: "Akash", currentAddress: "Jaipur" } };
    const data = candidate.updateOne(myquery, newvalues, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send("one documet updated");
        console.log("Data updated!");
      }
    });
  }




  export const deleteCandidateInfo= (req, res) =>
  candidate.deleteOne({ firstName: "Akash" }, function (err, data) {
    if (err) {
      console.log(err, "user doesn't exist");
    } else {
      res.send("one document deleted");
      console.log("one document deleted");
    }
  })



  export const createQuestion=  async(req, res) => {
    var myData = new question(req.body);
    console.log(myData);
    await myData
      .save()
      .then(() => {
        res.send("new question added to database");
      })
      .catch((err) => {
        console.log("error", err);
        // res.send("unable to save to database", err);
      });
  }

  export const getQuestionInfo =(req,res)=>{
    question.find(function (err,data){
        if(err){
            console.log(err);
        }
        else{
            res.send(data)
            console.log(data)
        }
    })
}

export const updateQuestion=(req,res)=>{
  let myquery={ans:"Ahemdabad"}
  let newvalues={$set:{question:"what is capital of rajasthan", ans:"Jaipur"}}
  const data = question.updateOne(myquery, newvalues, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send("one documet updated");
      console.log("Data updated!",data);
    }
  });
}


export const deleteQuestion=(req, res)=>{
    question.deleteOne({ans: "Ahemdabad"},function (err,data){
        if(err){
            console.log(err,"user doesn't existssss");
        }
        else{
          res.send("one document deleted");
            console.log("one document deleted",data);
        }
    })
}

