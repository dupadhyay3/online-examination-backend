import express from "express";
const userRoutes = express.Router();
// const app = express();

import {adminRegisteration,adminPasswordReset, createCollege,sendresult,createCandidate,getCandidateData,updateCandidateInfo,deleteCandidateInfo,createQuestion,getQuestionInfo,updateQuestion,deleteQuestion} from "../Controllers/controller.js"

userRoutes.post("/admin/create",adminRegisteration );
userRoutes.put("/admin/reset",adminPasswordReset );
// creating candidate in database
userRoutes.post("/candidate/create",createCandidate );

// getting candidates info from db
userRoutes.get("/candidate/get", getCandidateData);

// updating candidates info based on firstName
userRoutes.put("/candidate/update", updateCandidateInfo);

// deleting candidate document based on firstName
userRoutes.delete("/candidate/delete", deleteCandidateInfo);





// Creating a question 
userRoutes.post("/question/create",createQuestion );

// getting data from question collection
userRoutes.get("/question/get",getQuestionInfo )

//updating data in question collection
userRoutes.put("/question/update",updateQuestion)

// deleting data in question table
userRoutes.delete("/question/delete",deleteQuestion)

userRoutes.get("/result/send",sendresult )




// creating candidate in database
userRoutes.post("/college/create",createCollege );

export default userRoutes;

