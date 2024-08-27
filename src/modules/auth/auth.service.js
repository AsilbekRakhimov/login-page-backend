import { ConflictError } from "../../errors/conflict.error.js";
import { Users } from "./auth.schema.js";

class AuthService {
  #_model;
  constructor() {
    this.#_model = Users;
  }

  async logIn({ fullName, email, password, userAgent }) {
    try {
      const user = await this.#_model.create({
        fullName,
        email,
        password,
      });

    } catch (error) {
      throw new ConflictError(error.message);
    }
  }
}

export default new AuthService();
