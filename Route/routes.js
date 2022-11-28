import express from "express";
const userRoutes = express.Router();
// const app = express();

import {adminRegisteration,adminLogin,changeAdminPassword,loggedAdmin,sendAdminPasswordResetEmail,AdminPasswordReset, createCollege,sendresult,createCandidate,getCandidateData,updateCandidateInfo,deleteCandidateInfo,createQuestion,getQuestionInfo,updateQuestion,deleteQuestion} from "../Controllers/controller.js"
import checkAdminAuth from "../Middleware/auth-middleware.js"

//route level middleware
userRoutes.use('/loggedAdmin', checkAdminAuth)
userRoutes.use('/admin/change', checkAdminAuth)

// Admin panel
userRoutes.post("/admin/create",adminRegisteration );
userRoutes.post("/admin/login",adminLogin );
userRoutes.post('/send-reset-password-email', sendAdminPasswordResetEmail)
userRoutes.post('/reset-password/:id/:token', AdminPasswordReset)

//proctected routes
userRoutes.post("/admin/change",changeAdminPassword );
userRoutes.get("/loggedAdmin",loggedAdmin)




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

