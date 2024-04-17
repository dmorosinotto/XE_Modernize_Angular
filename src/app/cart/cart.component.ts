import { Component, effect, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgFor, CurrencyPipe } from "@angular/common";
import { Router } from "@angular/router";

import { CartService } from "@app/state/cart.service";
import { ShippingComponent } from "./shipping/shipping.component";

export const initFrm = <T extends {}>(ctrls: T) => inject(FormBuilder).nonNullable.group<T>(ctrls);

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styles: ["input.ng-invalid.ng-touched {border: 2px solid red }"],
    standalone: true,
    imports: [NgFor, ReactiveFormsModule, ShippingComponent, CurrencyPipe],
})
export class CartComponent {
    checkoutForm = initFrm({
        name: ["", Validators.required],
        address: "",
        ship: [0, Validators.min(1)],
    }); // automatic infer Typed Form

    //ALTERNATIVE TWO-WAY BINDING WITH SIGNAL
    // $shipCost = signal(this.shipCtrl.value); // infer Signal<number>
    constructor(private router: Router) {
        //ALTERNATIVE KEEP SYNC SIGNAL TO FORM CONTROL VALUE
        // effect(() => {
        //     this.shipCtrl.setValue(this.$shipCost());
        // });
        // this.shipCtrl.valueChanges.subscribe((value) => this.$shipCost.set(value));
    }

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
        return this.checkoutForm.controls.ship; // infer FormControl<number>
    }

    get isSaved() {
        if (!this.checkoutForm.dirty) return true;
        else return confirm("Data NOT saved!\nDo you want to exit checkout?");
    }
}

//SAMPLE SCAM
