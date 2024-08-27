import jwtConfig from "../config/jwt.config.js";
import { UnAuthorizedError } from "../errors/unauthorized.error.js";
import { verifyToken } from "../helper/jwt.helper.js";

export const checkAuthGuard = (isAuth) => {
  return (req, __, next) => {
    if (!isAuth) {
      req.role = "user";
      next();
      return;
    }

    const bearerToken = req.headers["authorization"];

    if (
      !bearerToken ||
      !bearerToken.startsWith("Bearer") ||
      !bearerToken.split("Bearer ")[1]
    ) {
      throw new UnAuthorizedError("UnAuthorized error, send with token");
    }

    const token = bearerToken.split("Bearer ")[1];
    const response = verifyToken(token, jwtConfig.jwtAccessKey);
    req.id = response.id;
    req.role = response.role;
    next();
  };
};
