import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log("Successfullly connected to DB!");
  } catch (err) {
    console.error("Failed to connect DB!", err);
  }
};

export default connectdb;
