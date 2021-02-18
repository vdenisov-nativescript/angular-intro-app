import * as validator from "email-validator";
export class User {
    email: string;
    password: string;

    public isValidEmail() {
        return validator.validate(this.email);
    }
}
