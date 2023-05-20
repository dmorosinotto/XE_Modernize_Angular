import { Component, OnInit, inject, Input } from "@angular/core";
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
	productService = inject(ProductService);
	@Input() productId!: string; //DEVE MATCHARE IL NOME DEL RouteParams!!

	ngOnInit() {
		this.product = this.productService.getAll().find(product => product.id === +this.productId);
	}

	Buy(product: Product) {
		this.cartService.addToCart(product);
		window.alert("Your product has been added to the cart!");
	}
}
