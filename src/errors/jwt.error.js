import { BaseError } from "./base.error.js";

export class JwtTokenError extends BaseError{
    constructor(message){
        super();
        this.status = 403
        this.name = "Jwt error"
        this.message = message
    }
}