import authService from "./auth.service.js";

class AuthController {
  #_service;
  constructor() {
    this.#_service = authService;
  }

  // login
  logIN = async (req, res, next) => {
    try {
      const data = await this.#_service.logIn(req.body);
      if (!data) {
        res.status(400).send({
          message: "you are not logged in",
        });
        return;
      }
      res.status(201).send({
        message: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  // sign in
  singIN = async (req, res, next) => {
    try {
      const data = await this.#_service.signIn(req.body);
      if (!data) {
        res.status(404).send({
          message: "User is not found",
        });
        return;
      }
      res.status(200).send({
        message: "success",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  // sign refresh token
  signRefreshTokenNew = async (req, res, next) => {
    try {
        const data = await this.#_service.signNewTokens(req.body);
        res.status(200).send({
            message:"success",
            data:data
        })
    } catch (error) {
        next(error)
    }
  }
}

export default new AuthController();
