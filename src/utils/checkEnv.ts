import dotenv from "dotenv";

const checkEnv = (variable: string) => {
  const value = process.env[variable];
  if (!value) {
    throw new Error(`Environment variable ${variable} is not set`);
  }
  return value;
};

export default checkEnv;
