import express from "express";
const app = express();

import mongoose from "mongoose";
// const PORT = 5500;
import dotenv from "dotenv";
dotenv.config();

// mongodb atlas connection

const uri = process.env.URI
mongoose
  .connect(uri)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

  // app is listening to port
// app.listen(PORT, () => {
//     console.log(`listening to the port number ${PORT}`);
//   });