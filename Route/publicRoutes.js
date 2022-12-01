import express from "express";
const userRoutes = express.Router();
import {createCandidate,updateCandidateInfo,getQuestionInfo,getCollegeData,sendresult} from "../Controllers/controller.js"

// creating candidate in database
userRoutes.post("/candidate/create",createCandidate );

// getting data from question collection
userRoutes.get("/question/get",getQuestionInfo );

// updating candidates info based on firstName
userRoutes.put("/candidate/update", updateCandidateInfo);


userRoutes.get("/college/get",getCollegeData );

userRoutes.post("/test/submit",sendresult );

export default userRoutes;