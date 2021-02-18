import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { Page, View, Color, TextField } from '@nativescript/core';

import { setHintColor } from '../../utils/hint-util';
import { User } from '../../shared/user/user';
import { UserService } from '../../shared/user/user.service';

@Component({
    selector: "ns-login",
    providers: [UserService],
    templateUrl: './login.component.html',
    styleUrls: ['./login-common.css', './login.css']
})
export class LoginComponent implements OnInit {
    public user: User;
    public isLoggingIn = true;

    @ViewChild('container') container: ElementRef;
    @ViewChild('email') email: ElementRef;
    @ViewChild('password') password: ElementRef;

    constructor(
        private router: Router,
        private userService: UserService,
        private page: Page,
    ) {
        this.user = new User();
        this.user.email = 'vdenisov.dev@gmail.com';
        this.user.password = '12345678';
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    public submit() {
        if (!this.user.isValidEmail()) {
            alert('Enter a valid email address');
            return;
        }

        if (this.isLoggingIn) {
            this.login()
        } else {
            this.signUp();
        }
    }

    public toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
        this.setTextFieldColors();

        const container: View = this.container.nativeElement;
        const background = this.isLoggingIn ? new Color('lightgreen') : new Color('lightblue');
        container.animate({ backgroundColor: background, duration: 200 });
    }

    private login() {
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(['/list']),
                (error) => alert('Unfortunately we could not find your account.')
            );
    }

    private signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert('Your account was successfully created.');
                    this.toggleDisplay();
                },
                () => alert('Unfortunately we were unable to create your account.')
            );
    }

    private setTextFieldColors() {
        const emailTextField = <TextField>this.email.nativeElement;
        const passwordTextField = <TextField>this.password.nativeElement;

        const mainTextColor = new Color(this.isLoggingIn ? 'black' : 'red');
        emailTextField.color = mainTextColor;
        passwordTextField.color = mainTextColor;

        const hintColor = new Color(this.isLoggingIn ? '#ACA6A7' : '#C4AFB4');
        setHintColor({ view: emailTextField, color: hintColor });
        setHintColor({ view: passwordTextField, color: hintColor });
    }
}
