import mongoose from "mongoose"

const  CandidateSchema = new mongoose.Schema(
    {
        firstName: String,
        middleName: String,
        lastName: String,
        email: String,
        dob: String,
        mobileNo: Number,
        educationDetails: String,
        areaOfIntrest: String,
        futureGoal: String,
        currentAddress: String
    }
);

const quations=new mongoose.Schema({
    question: String,
    options: Array,
    optionType: {
        type: String,
        enum : ['single','multiple'],
        default: 'single'
    },
    ans: String | Array
})

const candidate = mongoose.model('candidate',CandidateSchema);
const quation=mongoose.model('quations', quations)
export {candidate, quation}