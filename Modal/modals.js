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
  collegeName: String,
  batch:String,
  collegeId:Object,
});


// creating schema for question
export const QuestionSchema = new mongoose.Schema({
  question: String,
  options: Array,
  optionType: {
    type: String,
    enum : ['Single','Multiple'],
    default: 'Single'
  },
  ans: String || Array,
});

export const candidateResultSchema = new mongoose.Schema({
    candidate: Number,
    quations: Number,
    candidateAns:String,
    results: String,
});

export const collegeSchema = new mongoose.Schema({
  collegeName: String
});


export const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});
//exporting schema, will get in entery file which is index.js

// creating model for candiate and quation
const candidate = mongoose.model("candidate", CandidateSchema);
const questions = mongoose.model("question", QuestionSchema);
const result = mongoose.model("result", candidateResultSchema);
const college = mongoose.model("college", collegeSchema);
const admin = mongoose.model("admin", adminSchema);
export { candidate, questions, result, college,admin};
