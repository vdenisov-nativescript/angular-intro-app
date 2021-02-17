import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: [
        "./pages/login/login-common.css",
        "./pages/login/login.css",
    ]
})
export class AppComponent {
    public email = 'test@gmail.com';
    public isLoggingIn = true;

    public submit() {
        alert('You\'re using: ' + this.email);
    }

    public toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
