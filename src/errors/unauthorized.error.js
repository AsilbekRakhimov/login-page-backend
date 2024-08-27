import { BaseError } from "./base.error";

export class UnAuthorizedError extends BaseError {
  constructor(message) {
    this.status = 401;
    this.name = "UnAuthorized Error";
    this.message = message;
  }
}
