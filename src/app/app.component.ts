import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToggleLoginOutComponent, TopBarComponent } from "./shell";
import { HasRoleDirective } from "./state/auth";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"],
	standalone: true,
	imports: [RouterOutlet, TopBarComponent, ToggleLoginOutComponent, HasRoleDirective]
})
export class AppComponent {}
