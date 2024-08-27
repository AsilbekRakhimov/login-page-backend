import express from "express";
import appConfig from "./config/app.config.js";
import UAParser from "ua-parser-js";
import bodyParser from "body-parser";
import { mongo } from "./db/mongo.db.js";
import cookieParser from "cookie-parser";

const app = express();
// body parserlar
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("my-cookie-secret"));

// mongo DB ulash
await mongo();

app.get("/", (req, res) => {
  res.cookie("username", "demo qiymat", { maxAge: 60000, signed: true });
  res.cookie("username2", "demo qiymatn 2", { maxAge: 60000 });

  res.send({
    data: req.signedCookies,
    cookies: req.cookies,
  });
});

// serverni ishga tushirish
app.listen(appConfig.port, appConfig.host, () => {
  console.log(`Server is running on: ${appConfig.port}`);
});
