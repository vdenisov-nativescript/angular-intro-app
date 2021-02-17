import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

import { Page, View, Color } from '@nativescript/core';

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

    constructor(
        private router: Router,
        private userService: UserService,
        private page: Page,
    ) {
        this.user = new User();
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    public submit() {
        if (this.isLoggingIn) {
            this.login()
        } else {
            this.signUp();
        }
    }

    public toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;

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
}
