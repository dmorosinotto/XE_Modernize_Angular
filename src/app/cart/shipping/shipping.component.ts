import { Component, Input, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ShippingService, IShipping } from "./shipping.service";
import { FormControl } from "@angular/forms";
import { BaseComponent } from "@shared/base.component";

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
