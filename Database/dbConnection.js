import mongoose from "mongoose";

export const db = mongoose
  .connect("mongodb://localhost:27017/Route_BackEnd_Task")
  .then(() => {
    console.log("DataBase Connection Successfully");
  });
