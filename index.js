import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import swaggerFile from "./Swagger_Output.json" assert { type: "json" };
dotenv.config();
const port = 5000;

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
const MONGODB_URL = process.env.Mongo_local;
app.get("/", (req, res) => {
  res.send("hello express");
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: "*",
  })
);
app.use("/users", userRouter);
app.use("/tour", tourRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
