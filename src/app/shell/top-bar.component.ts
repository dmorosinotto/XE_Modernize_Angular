import { Component } from "@angular/core";

import { CartService } from "@app/state/cart.service";

@Component({
	selector: "app-top-bar",
	template: `
		<a [routerLink]="['/']"><h1>XE Modernize Angular</h1></a>
		<ng-content></ng-content>
		<a routerLink="/cart" [ngClass]="{ red: cartService.isEmpty }" class="button fancy-button">
			<i class="material-icons">shopping_cart</i>Checkout
		</a>
	`,
	styles: [".red {  color: red; }"]
})
export class TopBarComponent {
	constructor(public cartService: CartService) {}
}
