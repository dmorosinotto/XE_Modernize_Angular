import { Component, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { CartService } from "@app/state/cart.service";
import { ShippingModule } from "./shipping/shipping.component";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styles: ["input.ng-invalid.ng-touched {border: 2px solid red }"]
})
export class CartComponent {
	checkoutForm: FormGroup;
	constructor(private cartSrv: CartService, private formBuilder: FormBuilder, private router: Router) {
		this.checkoutForm = this.formBuilder.group({
			name: ["", Validators.required],
			address: "",
			ship: [0, Validators.min(1)]
		});
	}

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
@NgModule({
	declarations: [CartComponent],
	exports: [CartComponent],
	imports: [ShippingModule, ReactiveFormsModule, CommonModule]
})
export class CartModule {}
