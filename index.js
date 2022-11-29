import express from "express";
const app = express();
import "./Config/dbConnection.js"; //connection with monggodb atlas
import userRoutes from "./Route/routes.js";
import bodyParser from "body-parser";
import { sendEmail } from "./Services/mail.js";
import cors from "cors";
const PORT = 5000;
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





// sending mail
// sendEmail('Aakashsumanpurple3012@gmail.com','Aakashsumanpurple306@gmail.com','Test mail',"email functanailty added")

app.listen(PORT, () => {
  // res.send("HEllo");
  console.log(`listening to the port number ${PORT} `);
});