import { BaseError } from "./base.error.js";

export class ValidationError extends BaseError {
  constructor(message) {
    super();
    this.status = 403;
    this.name = "Validation Error";
    this.message = message;
  }
}
