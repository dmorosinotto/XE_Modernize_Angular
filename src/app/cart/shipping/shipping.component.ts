import { Component, Input, NgModule } from "@angular/core";
import { CommonModule, NgClass, NgFor, AsyncPipe, CurrencyPipe } from "@angular/common";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

import { ShippingService, IShipping } from "./shipping.service";
import { BaseComponent } from "@app/shell/base.component";

@Component({
	selector: "app-shipping",
	templateUrl: "./shipping.component.html",
	styles: [".error { color: red }"],
	providers: [ShippingService],
	standalone: true,
	imports: [NgClass, NgFor, AsyncPipe, CurrencyPipe]
})
export class ShippingComponent extends BaseComponent {
	shippingCosts!: Observable<IShipping[]>;

	constructor(private shippingService: ShippingService) {
		super();
		this.shippingCosts = this.shippingService.getShippingPrices().pipe(this.takeUntilDestroy());
	}

	@Input({ required: true }) frmCtrl!: FormControl<number>; //strict type check

	setCost(price: number) {
		this.frmCtrl.setValue(price);
	}
}

//SAMPLE SCAM WITH PROVIDERS
