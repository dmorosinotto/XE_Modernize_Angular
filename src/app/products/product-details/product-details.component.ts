import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "@shared/cart.service";

import { Product, FAKE_PRODUCTS } from "@shared/FAKE_products";
import { NgIf, CurrencyPipe } from "@angular/common";

@Component({
    selector: "app-product-details",
    templateUrl: "./product-details.component.html",
    styles: [],
    standalone: true,
    imports: [NgIf, CurrencyPipe]
})
export class ProductDetailsComponent implements OnInit {
	product: Product | undefined;

	constructor(private route: ActivatedRoute, public cartService: CartService) {}

	ngOnInit() {
		// First get the product id from the current route.
		const routeParams = this.route.snapshot.paramMap;
		const productIdFromRoute = Number(routeParams.get("productId"));

		// Find the product that correspond with the id provided in route.
		this.product = FAKE_PRODUCTS.find(product => product.id === productIdFromRoute);
	}

	Buy(product: Product) {
		this.cartService.addToCart(product);
		window.alert("Your product has been added to the cart!");
	}
}
