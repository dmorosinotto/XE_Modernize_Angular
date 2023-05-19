import { Component, OnInit, inject, Injector, runInInjectionContext } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CartService } from "@app/state/cart.service";
import { Product, ProductService } from "@app/state/product.service";
import { NgIf, CurrencyPipe } from "@angular/common";

export const injectPar = (name: string) => {
	const route = inject(ActivatedRoute);
	const routeParams = route.snapshot.paramMap;
	return routeParams.get(name);
};

@Component({
	selector: "app-product-details",
	templateUrl: "./product-details.component.html",
	styles: [],
	standalone: true,
	imports: [NgIf, CurrencyPipe]
})
export default class ProductDetailsComponent implements OnInit {
	product: Product | undefined;
	cartService = inject(CartService);

	constructor(private productService: ProductService) {}

	injector = inject(Injector); //SOLO NG16! SUPER-TRICK PER CATTURARE INJECTOR CORRENTE!
	ngOnInit() {
		// SENZA QUESTO DA ERRORE RUNTIME CHIAMANDO injectPar FUNZIONE inject() HA BISOGNO CONTESTO!!
		runInInjectionContext(this.injector, () => { //SOLO NG16!
			// First get the product id from the current route.
			const productIdFromRoute = Number(injectPar("productId"));
			// Find the product that correspond with the id provided in route.
			this.product = this.productService.getAll().find(product => product.id === productIdFromRoute);
		});
	}

	Buy(product: Product) {
		this.cartService.addToCart(product);
		window.alert("Your product has been added to the cart!");
	}
}
