import { Component, VERSION } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "@app/state/auth";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-toggle-login-out",
    template: `
        @if(!auth.isLoggedIn()) {
        <p>
            Welcome to <b>{{ ver }}</b
            >, press button to procede...<br />
            <button (click)="Login()">Login</button>
        </p>
        } @else {
        <button (click)="Logout()">LOGOUT</button>
        }
    `,
    styles: ["button { background-color: black }"],
    standalone: true,
    imports: [NgIf],
})
export class ToggleLoginOutComponent {
    ver = `ver. ${VERSION.full}`;
    constructor(public auth: AuthService, private router: Router) {}

    Login() {
        this.auth.Login();
        this.router.navigateByUrl("/");
    }

    Logout() {
        this.auth.Logout();
        this.router.navigate(["login"]);
    }
}
