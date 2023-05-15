import { Component, Input, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ShippingService, IShipping } from "./shipping.service";
import { UntypedFormControl } from "@angular/forms";
import { BaseComponent } from "@shared/base.component";
import { NgClass, NgFor, AsyncPipe, CurrencyPipe } from "@angular/common";

@Component({
    selector: "app-shipping",
    templateUrl: "./shipping.component.html",
    styles: [".error { color: red }"]
    // providers: [ShippingService],
    ,
    standalone: true,
    imports: [NgClass, NgFor, AsyncPipe, CurrencyPipe]
})
export class ShippingComponent extends BaseComponent {
	shippingCosts!: Observable<IShipping[]>;

	constructor(private shippingService: ShippingService) {
		super();
		this.shippingCosts = this.shippingService.getShippingPrices().pipe(this.takeUntilDestroy());
	}

	@Input() frmCtrl!: UntypedFormControl;

	setCost(price: number) {
		this.frmCtrl.setValue(price);
	}
}
