import dotenv from "dotenv";
dotenv.config();

const jwtConfig = {
  jwtAccessKey: process.env.JWT_ACCESS_KEY,
  jwtExpire: process.env.JWT_ACCESS_KEY_EXPIRE,
  jwtRefreshKey: process.env.JWT_REFRESH_KEY,
  jwtRefreshExpire: process.env.JWT_REFRESH_KEY_EXPIRE,
};

export default jwtConfig;
