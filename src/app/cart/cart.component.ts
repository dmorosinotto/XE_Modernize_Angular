import { Component, NgModule, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule, NgFor, CurrencyPipe } from "@angular/common";
import { Router } from "@angular/router";

import { CartService } from "@app/state/cart.service";
import { ShippingComponent } from "./shipping/shipping.component";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styles: ["input.ng-invalid.ng-touched {border: 2px solid red }"],
	standalone: true,
	imports: [NgFor, ReactiveFormsModule, ShippingComponent, CurrencyPipe]
})
export class CartComponent {
	checkoutForm = inject(FormBuilder).group({
		name: ["", Validators.required],
		address: "",
		ship: [0, Validators.min(1)]
	});
	router = inject(Router);
	cartSrv = inject(CartService);
	items = this.cartSrv.getItems();

	onSubmit(): void {
		// Process checkout data here
		alert(`OREDER RECIVED! Will be sent to:
		 	${JSON.stringify(this.checkoutForm.value)}`);
		this.items = this.cartSrv.clearCart();
		this.checkoutForm.reset();
		this.router.navigateByUrl("/");
	}

	get shipCtrl() {
		return this.checkoutForm.controls["ship"];
	}

	get isSaved() {
		if (!this.checkoutForm.dirty) return true;
		else return confirm("Data NOT saved!\nDo you want to exit checkout?");
	}
}

//SAMPLE SCAM
