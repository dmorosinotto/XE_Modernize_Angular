import { NgModule } from "@angular/core";
import { ShippingComponent } from "./shipping.component";
import { CommonModule } from "@angular/common";
import { ShippingService } from "./shipping.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [ShippingComponent],
	exports: [ShippingComponent],
	imports: [CommonModule, ReactiveFormsModule],
	providers: [ShippingService]
})
export class ShippingModule {}
