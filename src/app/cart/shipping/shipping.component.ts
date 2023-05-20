import { Component, Input, inject } from "@angular/core";
import { NgClass, NgFor, AsyncPipe, CurrencyPipe } from "@angular/common";
import { FormControl } from "@angular/forms";

import { ShippingService, IShipping } from "./shipping.service";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
	selector: "app-shipping",
	templateUrl: "./shipping.component.html",
	styles: [".error { color: red }"],
	providers: [ShippingService],
	standalone: true,
	imports: [NgClass, NgFor, AsyncPipe, CurrencyPipe]
})
export class ShippingComponent {
	shippingCosts = toSignal(
		inject(ShippingService).getShippingPrices(), //unsubcribe AUTOMATICO GARANTITO toSignal
		{ initialValue: [] as IShipping[] } //DEFINISCE 1° VALORE EMESSO - ALTRIMENTI undefined
	); //infer Singal<IShipping[]>

	@Input({ required: true }) frmCtrl!: FormControl<number>; //strict type check

	setCost(price: number) {
		this.frmCtrl.setValue(price);
	}
}

//SAMPLE SCAM WITH PROVIDERS
