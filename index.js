import express from "express";
const app = express();
import "./Config/dbConnection.js"; //connection with monggodb atlas
import userRoutes from "./Route/publicRoutes.js"
import ManagementRoutes from "./Route/protectedRoutes.js";
import bodyParser from "body-parser";
import { sendEmail } from "./Services/mail.js";
import cors from "cors";

app.use(
  cors({
    origin: "*",
  })
);

// creating middleware
app.use(bodyParser.json()); // for parsing application/json/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/management", ManagementRoutes)




// sending mail
// sendEmail('Aakashsumanpurple3012@gmail.com','Aakashsumanpurple306@gmail.com','Test mail',"email functanailty added")

app.listen(process.env.PORT, () => {
  // res.send("HEllo");
  console.log(`listening to the port number ${process.env.PORT} `);
});