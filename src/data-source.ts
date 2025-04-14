import mongoose from "mongoose";

const dbURI = process.env.DB_URI || "mongodb://localhost:27017/mydatabase";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = async () => {
  await mongoose.connect(dbURI);

  return mongoose.connection;
};

export default connectDb;
