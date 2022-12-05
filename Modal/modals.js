import mongoose from "mongoose";

// creating schema for candidate
export const CandidateSchema = new mongoose.Schema({
  firstName: {type:String, required:true},
  middleName: {type:String, required:true},
  lastName: {type:String, required:true},
  email: {type:String, required:true},
  dob: {type:String, required:true},
  mobileNo: {type:String, required:true},
  educationDetails: {type:String, required:true},
  areaOfIntrest: {type:String, required:true},
  futureGoal: {type:String, required:true},
  currentAddress: {type:String, required:true},
  collegeName: {type:String, required:true},
  experience:{
    type: String,
    enum : ['null','0','1-2','3-4','5-6','7-8','9-10'],
    default: 'null'
  },
  batch:{type:String, required:true},
  collegeId:{type:Object, required:true},
  
  
    
});

// creating schema for question
export const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [{
      title: {
          type: String,
          required: false
      },
      value: {
          type: Boolean,
          required: false,
          default: false
      },
      query:{type:String, required:false}
  }],
  
  optionType: {
    type: String,
    enum : ['Single','Multiple',"Query"],
    default: 'Single'
  },
  ans: Array,
});


export const candidateResultSchema = new mongoose.Schema({
    candidateId: {type:Object},
    testDate: {type:Object},
    questionAnswer:[
      {
        questionId:{type:Object},
        ans: Array
      }
    ]
});

export const collegeSchema = new mongoose.Schema({
  collegeName: String,
  show:Boolean
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


