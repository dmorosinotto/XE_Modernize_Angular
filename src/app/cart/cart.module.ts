import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { CartComponent } from "./cart.component";
import { ShippingModule } from "./shipping";

@NgModule({
	declarations: [CartComponent],
	exports: [CartComponent],
	imports: [ShippingModule, ReactiveFormsModule, CommonModule]
})
export class CartModule {}
