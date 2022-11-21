import express from "express";
const app = express();

import mongoose from "mongoose";
// const PORT = 5500;
import dotenv from "dotenv";
dotenv.config();

// mongodb atlas connection
const password = process.env.MONGODB_PASSWORD;
const user=process.env.MONGOD_USER
const uri = `mongodb+srv://${user}:${password}@cluster0.kxo9afi.mongodb.net/test`;
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