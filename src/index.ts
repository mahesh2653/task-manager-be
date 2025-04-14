import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import checkEnv from "./utils/checkEnv";
import logger from "./utils/winston";
import connectDb from "./data-source";
import routerV1 from "./routes/index";
import morganMiddleware from "./middleware/morgan";
import errorHandler from "./middleware/errorHandler";

const app = express();

dotenv.config();
const PORT = checkEnv("PORT");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", routerV1);
app.use(errorHandler);

connectDb()
  .then(() => {
    logger.info("Database connected successfully");

    app.listen(Number(PORT), () => {
      logger.info(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Database connection error:", error);
    process.exit(1);
  });
