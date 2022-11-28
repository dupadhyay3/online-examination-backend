import express from "express";
const app = express();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  candidate,
  questions,
  result,
  college,
  admin,
} from "../Modal/modals.js";

import transporter from '../Config/emailconfig.js'

export const adminRegisteration = async (req, res) => {
  const { name, email, password, password_confirmation } = req.body;
  const user = await admin.findOne({ email: email });
  if (user) {
    res.send({ status: "failed", message: "Email already exists" });
  } else {
    if (name && email && password && password_confirmation) {
      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const docu = new admin({
            name: name,
            email: email,
            password: hashPassword,
          });
          await docu.save();
          const saved_user = await admin.findOne({ email: email });
          // Generate JWT Token
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
          );
          res
            .status(201)
            .send({
              status: "success",
              message: "Registration Success",
              token: token,
            });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to Register" });
        }
      } else {
        res.send({
          status: "failed",
          message: "Password and Confirm Password doesn't match",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email && password) {
      const user = await admin.findOne({ email: email })
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password)
        if ((user.email === email) && isMatch) {
          // Generate JWT Token
          const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
          res.send({ "status": "success", "message": "Login Success", "token": token })
        } else {
          res.send({ "status": "failed", "message": "Email or Password is not Valid" })
        }
      } else {
        res.send({ "status": "failed", "message": "You are not a Registered User" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  } catch (error) {
    console.log(error)
    res.send({ "status": "failed", "message": "Unable to Login" })
  }
}

export const changeAdminPassword = async (req, res) => {
  const { password, password_confirmation } = req.body
  if (password && password_confirmation) {
    if (password !== password_confirmation) {
      res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
    } else {
      const salt = await bcrypt.genSalt(10)
      const newHashPassword = await bcrypt.hash(password, salt)
      // console.log(req.user,"dfsdfsadfasdf");
      await admin.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
      res.send({ "status": "success", "message": "Password changed succesfully" })
    }
  } else {
    res.send({ "status": "failed", "message": "All Fields are Required" })
  }
}

export const loggedAdmin = async (req, res) => {
  res.send({ "Admin": req.user })
}

export const sendAdminPasswordResetEmail = async (req, res) => {
  const { email } = req.body
  console.log(req.body);
  if (email) {
    const user = await admin.findOne({ email: email })
    if (user) {
      const secret = user._id + process.env.JWT_SECRET_KEY
      const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
      const link = `http://127.0.0.1:5000/users/reset-password/${user._id}/${token}`
      console.log(link)
      // // Send Email
      let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password Reset Link",
        html: `<a href=${link}>Click Here</a> to Reset Your Password`
      })
      res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
    } else {
      res.send({ "status": "failed", "message": "Email doesn't exists" })
    }
  } else {
    res.send({ "status": "failed", "message": "Email Field is Required" })
  }
}

export const AdminPasswordReset = async (req, res) => {
  const { password, password_confirmation } = req.body
  const { id, token } = req.params
  console.log(req.params);
  const user = await admin.findById(id)
  const new_secret = user._id + process.env.JWT_SECRET_KEY
  try {
    jwt.verify(token, new_secret)
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await admin.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password Reset Successfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  } catch (error) {
    console.log(error)
    res.send({ "status": "failed", "message": "Invalid Token" })
  }
}


/**
 *
 * @param {*} req.body  it will take inputs from frontend
 *
 */

export const createCandidate = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    dob,
    mobileNo,
    educationDetails,
    areaOfIntrest,
    futureGoal,
    currentAddress,
    collegeName,
  } = req.body;
  const user = await candidate.findOne({ email: email });
  console.log(user);
  if (user) {
    res.send({ status: "failed", message: "Email already exists" });
  } else {
    const collegeData = await college.findOne({ collegeName: collegeName });
    let collegeId = collegeData._id;
    const d = new Date();
    let batch = d.getFullYear();
    // console.log(collegeData._id,"collegeData");
    if (
      firstName &&
      middleName &&
      lastName &&
      email &&
      dob &&
      mobileNo &&
      educationDetails &&
      areaOfIntrest &&
      futureGoal &&
      currentAddress &&
      collegeName &&
      batch &&
      collegeId
    ) {
      try {
        console.log("insideeeeeeeeeee");

        const doc = new candidate({
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          email: email,
          dob: dob,
          mobileNo: mobileNo,
          educationDetails: educationDetails,
          areaOfIntrest: areaOfIntrest,
          futureGoal: futureGoal,
          currentAddress: currentAddress,
          collegeName: collegeName,
          batch: batch,
          collegeId: collegeId,
        });
        await doc.save();
        res.status(201).send({
          status: "success",
          message: "Registration Success",
        });
      } catch (error) {
        console.log(error);
        res.send({ status: "failed", message: "Unable to Register" });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
export const getCandidateData = (req, res) => {
  candidate.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      // data.map(email){return data.email}
      console.log(data.length, "idddddddddddddddddddddd");
      data.forEach((element) => {
        console.log(element.email);
      });
    }
  });
  // .catch( (err)=> {err});
};

/**
 * 
 changing firstName and currentAddress if firstName is "Lucky"
 */
export const updateCandidateInfo = async(req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    dob,
    mobileNo,
    educationDetails,
    areaOfIntrest,
    futureGoal,
    currentAddress,
  } = req.body;

  const user = await candidate.findOne({ email: email });
  if (user) {
  var myquery = { email: email };
  var newvalues = {
    $set: {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      dob: dob,
      mobileNo: mobileNo,
      educationDetails: educationDetails,
      areaOfIntrest: areaOfIntrest,
      futureGoal: futureGoal,
      currentAddress: currentAddress,
    },
  };
  candidate.updateOne(myquery, newvalues, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res
            .status(201)
            .send({
              status: "success",
              message: `${data.modifiedCount} document updated`,
            });}
  });
  }else{
    res
            .status(404)
            .send({
              status: "failed",
              message: `user doesn't exist with this mailId`,
            });
  }
  

};

/**
 deleating documets where name is Akash
 */
export const deleteCandidateInfo = async(req, res) => {
  const { email } = req.body
  console.log(email);
  const user = await candidate.findOne({ email: email });
  if (user) {
  candidate.deleteOne({ email: email }, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res
      .status(201)
      .send({
        status: "Success",
        message: `${data.deletedCount} document deleted`,
      });
    }
  });
}
else{
  res
  .status(404)
  .send({
    status: "failed",
    message: `user doesn't exist with this mailId`,
  });
}};

/**
   * 
creating question 
data will be recived from frontend
*/

export const createQuestion = async (req, res) => {
  const { question, options, optionType, ans } = req.body;

  if (question && options && optionType && ans) {
    try {
      const doc = new questions({
        question:question,
        options:options,
        optionType:optionType,
        ans:ans,
      });
      await doc.save();
      res.status(201).send({
        status: "success",
        message: "Question added successfully",
      });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to add question" });
    }
  } else {
    res.send({ status: "failed", message: "All fields are required" });
  }
};

// export const createQuestion = async (req, res) => {

//   var myData = new question(req.body);
//   console.log(myData);

//   await myData
//     .save()
//     .then(() => {
//       res.send("new question added to database");
//     })
//     .catch((err) => {
//       console.log("error", err);
//       // res.send("unable to save to database", err);
//     });
// };

/**
 * 
  getting all the questions
 */
export const getQuestionInfo = (req, res) => {
  questions.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log(data);
    }
  });
};

/**
 * 
 updating question if ans is Ahemdabad
 */
export const updateQuestion = (req, res) => {
  let myquery = { ans: "Ahemdabad" };
  let newvalues = {
    $set: { question: "what is capital of rajasthan", ans: "Jaipur" },
  };
  const data = questions.updateOne(myquery, newvalues, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send("one documet updated");
      console.log("Data updated!", data);
    }
  });
};

/**
 * 
deleting question if ans is "Ahemdabad"
 */
export const deleteQuestion = (req, res) => {
  questions.deleteOne({ ans: "Ahemdabad" }, function (err, data) {
    if (err) {
      console.log(err, "user doesn't existssss");
    } else {
      res.send("one document deleted");
      console.log("one document deleted", data);
    }
  });
};

export const createCollege = async (req, res) => {
  const collegeData = new college(req.body);

  college
    .find({ collegeName: req.body.collegeName })
    .then((ans) => {
      console.log(ans);
      console.log(ans.length);
      if (ans.length == 0) {
        collegeData
          .save()
          .then(() => {
            res.send("new college added to database");
          })
          .catch((err) => {
            console.log("error", err);
            res.send("unable to save to database", err);
          });
      } else {
        res.send("college already exist");
      }
    })
    .catch((err) => {
      console.log(err.Message);
    });
};

export const sendresult = async (req, res) => {
  var user = candidate.findOne({ firstName: "Lucky" });
  console.log(user[0].email);
  const candidates = candidate.find(
    { firstName: "Lucky" },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log(data);
      }
    }
  );

  // const questions = question.find({
  //   question: "what is capital of rajasthan",
  // });
  // console.log(candidates);

  // console.log(question._id);

  // const candidateResult = function answer(ans) {
  //   if (candidate.ans == question.ans) {
  //     return "pass";
  //   } else {
  //     return "fail";
  //   }
  // };
  // answer(candidate.ans);

  // let result = {
  //   candidateId: candidate._id,
  //   quationId: question._id,
  //   candidateAns: candidate.ans,
  //   results: candidateResult,
  // };
  // console.log(result);
  // await result
  //   .save()
  //   .then(() => {
  //     res.send("new question added to database");
  //   })
  //   .catch((err) => {
  //     console.log("error", err);
  //     // res.send("unable to save to database", err);
  //   });
};
