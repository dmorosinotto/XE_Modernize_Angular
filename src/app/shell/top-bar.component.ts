import { Component, inject, signal, computed, effect } from "@angular/core";

import { CartService } from "@app/state/cart.service";
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-top-bar",
	template: `
		<a [routerLink]="['/']"><h1>XE Modernize Angular</h1></a>
		<ng-content></ng-content>
		<a routerLink="/cart" [ngClass]="{ red: cartService.isEmpty }" class="button fancy-button">
			<i class="material-icons">shopping_cart</i>Checkout
		</a>
	`,
	styles: [".red {  color: red; }"],
	standalone: true,
	imports: [RouterLink, NgClass]
})
export class TopBarComponent {
	cartService = inject(CartService);

	constructor() {
		//ESEMPIO BASE SIGNAL
		const counter = signal(0); //infer WritableSignal<number>
		const isOdd = computed(() => !!(counter() % 2)); //infer Signal<boolean>
		effect(() => {
			//VIENE AUTOMATICAMENTE RICALCOLATO NOTATE () PER LEGGERE
			console.log(`Adesso ${counter()} è ${isOdd() ? "dis" : ""}pari`);
		});

		counter.set(42);
		counter.update(c => c + 1);
	}
}
