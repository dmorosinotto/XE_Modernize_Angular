import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToggleLoginOutComponent } from "./shell/toggle-login-out.component";
import { HasRoleDirective } from "./state/auth/has-role.directive";
import { TopBarComponent } from "./shell/top-bar.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    standalone: true,
    imports: [TopBarComponent, HasRoleDirective, ToggleLoginOutComponent, RouterOutlet]
})
export class AppComponent {}
