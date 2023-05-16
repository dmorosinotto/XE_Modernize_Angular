import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { TopBarComponent } from "./top-bar.component";
import { ToggleLoginOutComponent } from "./toggle-login-out.component";
import { HasRoleModule } from "@app/state/auth";

@NgModule({
	declarations: [TopBarComponent, ToggleLoginOutComponent],
	exports: [TopBarComponent, ToggleLoginOutComponent, HasRoleModule],
	imports: [CommonModule, RouterModule]
})
export class ShellModule {}
