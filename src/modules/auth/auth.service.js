import UAParser from "ua-parser-js";
import { ConflictError } from "../../errors/conflict.error.js";
import { Users } from "./schemas/auth.schema.js";
import { devices } from "./schemas/device.schema.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyToken,
} from "../../helper/jwt.helper.js";
import jwtConfig from "../../config/jwt.config.js";

class AuthService {
  #_auth_model;
  #_device_model;
  constructor() {
    this.#_auth_model = Users;
    this.#_device_model = devices;
  }

  // login
  async logIn({ full_name, email, password, userAgent }) {
    try {
      // login part
      const data = await this.#_auth_model.create({
        full_name,
        email,
        password,
      });

      // pars userAgent
      const parser = new UAParser();
      const result = parser.setUA(userAgent).getResult();
      const device = await this.#_device_model.create({
        ua: result?.ua,
        browser: result?.browser,
        engine: result?.engine,
        os: result?.os,
        device: result?.device,
        cpu: result?.cpu,
        user_id: data?._id,
      });

      // sign tokens
      const accessToken = signAccessToken({
        id: data._id,
        role: data.role,
        device: device.ua,
      });
      const refreshToken = signRefreshToken({
        id: data._id,
        role: data.role,
        device: device.ua,
      });

      // return data
      return { data, accessToken, refreshToken };
    } catch (error) {
      throw new ConflictError(error.message + " in service while log-in");
    }
  }

  // sign in
  async signIn({ email, password, userAgent }) {
    try {
      const data = await this.#_auth_model.findOne({
        email: email,
      });
      if (data && data.password == password) {
        const accessToken = signAccessToken({
          id: data._id,
          role: data.role,
          device: userAgent,
        });
        const refreshToken = signRefreshToken({
          id: data._id,
          role: data.role,
          device: userAgent,
        });
        return { accessToken, refreshToken };
      }
      return false;
    } catch (error) {
      throw new ConflictError(error.message + " error in service sign in");
    }
  }

  // sign refresh token
  async signNewTokens({ refreshToken }) {
    try {
      const response = verifyToken(refreshToken, jwtConfig.jwtRefreshKey);
      const newAccessToken = signAccessToken({
        id: response.id,
        role: response.role,
        device: response.device,
      });
      const newRefreshToken = signRefreshToken({
        id: response.id,
        role: response.role,
        device: response.device,
      });
      return { newAccessToken, newRefreshToken };
    } catch (error) {
      throw new ConflictError(error.message + " in service sign new tokens");
    }
  }
}

export default new AuthService();
