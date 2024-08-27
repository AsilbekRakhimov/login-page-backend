import { BaseError } from "./base.error";

export class UnAuthorizedError extends BaseError {
  constructor(message) {
    super();
    this.status = 401;
    this.name = "UnAuthorized Error";
    this.message = message;
  }
}
