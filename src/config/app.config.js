import dotenv from "dotenv";
dotenv.config();

const appConfig = {
  port: process.env.PORT || 3002,
  host: process.env.HOST,
};

export default appConfig;
