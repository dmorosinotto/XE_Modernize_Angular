import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { CartComponent } from "./cart.component";
import { ShippingModule } from "./shipping";

@NgModule({
    exports: [CartComponent],
    imports: [ShippingModule, ReactiveFormsModule, CommonModule, CartComponent]
})
export class CartModule {}
