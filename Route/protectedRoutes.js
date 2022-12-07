import express from "express";
const ManagementRoutes = express.Router();


import {getSingleQuestion,getCandidateByID,getAllCandidateResult,getCandidateResult,adminRegisteration,adminLogin,changeAdminPassword,loggedAdmin,sendAdminPasswordResetEmail,AdminPasswordReset, createCollege, getCollegeData, sendresult,getCandidateData,deleteCandidateInfo,createQuestion,getQuestionInfo,updateQuestion,deleteQuestion} from "../Controllers/controller.js"
import checkAdminAuth from "../Middleware/auth-middleware.js"

//route level middleware
ManagementRoutes.use('/loggedAdmin', checkAdminAuth)
ManagementRoutes.use('/admin/change', checkAdminAuth)

// Admin panel
ManagementRoutes.post("/admin/create",adminRegisteration );
ManagementRoutes.post("/admin/login",adminLogin );
ManagementRoutes.post('/send-reset-password-email', sendAdminPasswordResetEmail)
ManagementRoutes.post('/reset/password/:id/:token', AdminPasswordReset)

//proctected routes
ManagementRoutes.post("/admin/change",changeAdminPassword );
ManagementRoutes.get("/loggedAdmin",loggedAdmin)

// getting candidates info from db
ManagementRoutes.get("/candidate/get", getCandidateData);
ManagementRoutes.get("/candidateall/get/:id", getCandidateByID);


// deleting candidate document based on firstName
ManagementRoutes.delete("/candidate/delete", deleteCandidateInfo);

// Creating a question 
ManagementRoutes.post("/question/create",createQuestion );

// getting data from question collection
ManagementRoutes.get("/question/get",getQuestionInfo );
ManagementRoutes.get("/question/get/:id",getSingleQuestion );

//updating data in question collection
ManagementRoutes.put("/question/update",updateQuestion)

// deleting data in question table
ManagementRoutes.delete("/question/delete",deleteQuestion)

ManagementRoutes.get("/result/send",sendresult )
ManagementRoutes.get("/result/get/:id",getCandidateResult )
ManagementRoutes.get("/result/get",getAllCandidateResult )

// creating college in database
ManagementRoutes.post("/college/create",createCollege );

export default ManagementRoutes;

