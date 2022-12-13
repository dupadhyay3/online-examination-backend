import express from "express";
const userRoutes = express.Router();
import {randomQuestion,updateResult,createCandidate,getQuestionInfo,getCollegeData,sendresult} from "../Controllers/controller.js"

// creating candidate in database
userRoutes.post("/candidate/create",createCandidate );

// getting data from question collection
userRoutes.get("/question/get",getQuestionInfo );

// getting random  question  from collection
userRoutes.get("/question/get",randomQuestion );



userRoutes.get("/college/get",getCollegeData );

userRoutes.post("/test/submit",sendresult );
userRoutes.put("/result/update",updateResult )
export default userRoutes;
