import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js";
import { JwtTokenError } from "../errors/jwt.error.js";

// sign access token
export const signAccessToken = (data) => {
  return jwt.sign(data, jwtConfig.jwtAccessKey, {
    expiresIn: jwtConfig.jwtExpire,
  });
};

// sign refresh token
export const signRefreshToken = (data) => {
  return jwt.sign(data, jwtConfig.jwtRefreshKey, {
    expiresIn: jwtConfig.jwtRefreshExpire,
  });
};

// verify tokens
export const verifyToken = (token, secretKey) => {
  let response = null;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (decoded) {
      response = decoded;
    }

    if (err instanceof jwt.JsonWebTokenError) {
      throw new JwtTokenError("Token is invalid");
    }
    if (err instanceof jwt.NotBeforeError) {
      throw new JwtTokenError("Token is used before initialised");
    }
    if (err instanceof jwt.TokenExpiredError) {
      throw new JwtTokenError("Token is expired");
    }
  });
  return response;
};
