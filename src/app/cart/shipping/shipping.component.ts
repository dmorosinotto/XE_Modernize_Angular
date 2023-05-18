import { Component, Input, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

import { ShippingService, IShipping } from "./shipping.service";
import { BaseComponent } from "@app/shell/base.component";

@Component({
	selector: "app-shipping",
	templateUrl: "./shipping.component.html",
	styles: [".error { color: red }"]
	// providers: [ShippingService],
})
export class ShippingComponent extends BaseComponent {
	shippingCosts!: Observable<IShipping[]>;

	constructor(private shippingService: ShippingService) {
		super();
		this.shippingCosts = this.shippingService.getShippingPrices().pipe(this.takeUntilDestroy());
	}

	@Input() frmCtrl!: FormControl;

	setCost(price: number) {
		this.frmCtrl.setValue(price);
	}
}

@NgModule({
	declarations: [ShippingComponent],
	exports: [ShippingComponent],
	imports: [CommonModule],
	providers: [ShippingService]
})
export class ShippingModule {}
