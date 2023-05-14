import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { TopBarComponent } from "./top-bar/top-bar.component";

@NgModule({
	declarations: [TopBarComponent],
	exports: [TopBarComponent],
	imports: [CommonModule, RouterModule]
})
export class ShellModule {}
