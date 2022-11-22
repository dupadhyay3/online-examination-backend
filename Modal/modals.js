import mongoose from "mongoose";

// creating schema for candidate
export const CandidateSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  dob: String,
  mobileNo: Number,
  educationDetails: String,
  areaOfIntrest: String,
  futureGoal: String,
  currentAddress: String,
});


// creating schema for question
export const QuestionSchema = new mongoose.Schema({
  question: String,
  options: Array,
  optionType: String,
  ans: String || Array,
});

export const candidateResult = new mongoose.Schema({
    candidate: Number,
    quations: Number,
    candidateAns:String,
    results: String,
});

//exporting schema, will get in entery file which is index.js

// creating model for candiate and quation
const candidate = mongoose.model("candidate", CandidateSchema);
const question = mongoose.model("question", QuestionSchema);
const result = mongoose.model("result", candidateResult);
export { candidate, question, result };
