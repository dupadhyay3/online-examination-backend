import express from "express";
const app = express();

import { candidate, question, result } from "../Modal/modals.js";

/**
 * 
 * @param {*} req.body  it will take inputs from frontend
 * 
 */
export const createCandidate = async (req, res) => {
  var myData = new candidate(req.body);
  console.log(myData);
  await myData
    .save()
    .then(() => {
      res.send("new candidate added to database");
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getCandidateData = (req, res) => {
  candidate.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data);
    }
  });
  // .catch( (err)=> {err});
};


/**
 * 
 changing firstName and currentAddress if firstName is "Lucky"
 */
export const updateCandidateInfo = (req, res) => {
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
};

/**
 deleating documets where name is Akash
 */
export const deleteCandidateInfo = (req, res) =>
  candidate.deleteOne({ firstName: "Akash" }, function (err, data) {
    if (err) {
      console.log(err, "user doesn't exist");
    } else {
      res.send("one document deleted");
      console.log("one document deleted");
    }
  });

  
  /**
   * 
creating question 
data will be recived from frontend
*/
export const createQuestion = async (req, res) => {
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
};

/**
 * 
  getting all the questions
 */
export const getQuestionInfo = (req, res) => {
  question.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data);
    }
  });
};

/**
 * 
 updating question if ans is Ahemdabad
 */
export const updateQuestion = (req, res) => {
  let myquery = { ans: "Ahemdabad" };
  let newvalues = {
    $set: { question: "what is capital of rajasthan", ans: "Jaipur" },
  };
  const data = question.updateOne(myquery, newvalues, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send("one documet updated");
      console.log("Data updated!", data);
    }
  });
};

/**
 * 
deleting question if ans is "Ahemdabad"
 */
export const deleteQuestion = (req, res) => {
  question.deleteOne({ ans: "Ahemdabad" }, function (err, data) {
    if (err) {
      console.log(err, "user doesn't existssss");
    } else {
      res.send("one document deleted");
      console.log("one document deleted", data);
    }
  });
};

export const sendresult = async (req, res) => {
  var user = candidate.findOne( { firstName: "Lucky" })
  console.log(user[0].email);
  const candidates =  candidate.find({ firstName: "Lucky" },function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data);
    }
  });
  
  // const questions = question.find({
  //   question: "what is capital of rajasthan",
  // });
  // console.log(candidates);


  // console.log(question._id);

  // const candidateResult = function answer(ans) {
  //   if (candidate.ans == question.ans) {
  //     return "pass";
  //   } else {
  //     return "fail";
  //   }
  // };
  // answer(candidate.ans);

  // let result = {
  //   candidateId: candidate._id,
  //   quationId: question._id,
  //   candidateAns: candidate.ans,
  //   results: candidateResult,
  // };
  // console.log(result);
  // await result
  //   .save()
  //   .then(() => {
  //     res.send("new question added to database");
  //   })
  //   .catch((err) => {
  //     console.log("error", err);
  //     // res.send("unable to save to database", err);
  //   });
};
