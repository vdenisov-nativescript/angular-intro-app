import { Component } from "@angular/core";
import { User } from './shared/user/user';

@Component({
    selector: "ns-app",
    templateUrl: "./pages/login/login.component.html",
    styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
})
export class AppComponent {
    public user: User;
    public isLoggingIn = true;

    constructor() {
        this.user = new User()
    }

    public submit() {
        alert('You\'re using: ' + this.user.email);
    }

    public toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
