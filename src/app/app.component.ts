import { Component } from "@angular/core";
import { User } from './shared/user/user';
import { UserService } from './shared/user/user.service';

@Component({
    selector: "ns-app",
    providers: [UserService],
    templateUrl: "./pages/login/login.component.html",
    styleUrls: [
        "./pages/login/login-common.css",
        // "./pages/login/login.css",
    ]
})
export class AppComponent {
    public user: User;
    public isLoggingIn = true;

    constructor(private userService: UserService) {
        this.user = new User();
        this.user.email = 'test@gmail.com';
        this.user.password = '123456';
    }

    public submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    public toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    private login() {
        // TODO: Define
    }

    private signUp() {
        this.userService.register(this.user)
            .subscribe(
                (data) => {
                    console.log('DATA =>', data);
                    alert('Your account was successfully created.');
                    this.toggleDisplay();
                },
                (err) => {
                    console.log('ERR =>', err);
                    alert('Unfortunately we were unable to create your account.');
                }
            );
    }
}
