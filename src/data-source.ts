import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = async () => {
  await mongoose.connect(dbURI);

  return mongoose.connection;
};

export default connectDb;
