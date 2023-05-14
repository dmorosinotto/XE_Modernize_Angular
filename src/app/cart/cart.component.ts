import { Component } from "@angular/core";
import { CartService } from "../shared/cart.service";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styles: ["input.ng-invalid.ng-touched {border: 2px solid red }"]
})
export class CartComponent {
	checkoutForm: UntypedFormGroup;
	constructor(private cartSrv: CartService, private formBuilder: UntypedFormBuilder, private router: Router) {
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
		else return confirm("Dati non salvati!\nVuoi uscire?");
	}
}
