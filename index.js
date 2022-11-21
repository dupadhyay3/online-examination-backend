import express from "express";
const app = express();
import "./Db/connection.js";
import "./Route/routes.js"
import userRoutes from "./Route/routes.js";
const PORT = 5000;
import "./Controllers/controller.js";

import cors from "cors";

// creating middleware
import bodyParser from "body-parser";


app.use(bodyParser.json()); // for parsing application/json/
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use("/users", userRoutes);


// app.use(
//   cors({
//     origin: "*",
//   })
// );

// import "./Services/mail.js"; // sending mail


app.listen(PORT, () => {
  // res.send("HEllo");
  console.log(`listening to the port number ${PORT} `);
});