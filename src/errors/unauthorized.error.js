import { BaseError } from "./base.error.js";

export class UnAuthorizedError extends BaseError {
  constructor(message) {
    super();
    this.status = 401;
    this.name = "UnAuthorized Error";
    this.message = message;
  }
}
