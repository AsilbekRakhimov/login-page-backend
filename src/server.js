import express from "express";
import appConfig from "./config/app.config.js";
import bodyParser from "body-parser";
import { mongo } from "./db/mongo.db.js";
import { ErrorHandlerMIddleware } from "./middlewares/error-handler.middleware.js";
import cors from "cors";
import router from "./routes/index.routes.js";

const app = express();
// body parserlar
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongo DB ulash
await mongo();

// corsni ishlatish
app.use(cors());

// main endpoint
app.use("/api/v1", router)

// notogri url uchun response
app.all("*", (__, res) => {
  res.status(404).send({
    message: "Noto'g'ri url",
  });
});

// error handler middleware
app.use(ErrorHandlerMIddleware);

// serverni ishga tushirish
app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Server is running on: ${appConfig.port}`);
});
