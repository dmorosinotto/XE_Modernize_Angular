import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "@shared/cart.service";

@Component({
	selector: "app-top-bar",
	templateUrl: "./top-bar.component.html",
	styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent {
	constructor(private router: Router, public cartService: CartService) {}

	goToCart() {
		if (!this.cartService.isEmpty) this.router.navigate(["/cart"]);
	}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
