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
  ans: String ,
});

// candidateResult {
//     candidate: Relation with candidateTable,
//     quations: Relationwith Quations Table,
//     candidateAns,
//     result: enum[pass, fail],
// }

//exporting schema, will get in entery file which is index.js

// creating model for candiate and quation
const candidate = mongoose.model("candidate", CandidateSchema);
const question = mongoose.model("question", QuestionSchema);
export { candidate, question };
