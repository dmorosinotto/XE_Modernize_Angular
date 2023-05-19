import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CartService } from "@app/state/cart.service";
import { Product, ProductService } from "@app/state/product.service";
import { NgIf, CurrencyPipe } from "@angular/common";

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

	constructor(private route: ActivatedRoute, private productService: ProductService) {}

	ngOnInit() {
		// First get the product id from the current route.
		const routeParams = this.route.snapshot.paramMap;
		const productIdFromRoute = Number(routeParams.get("productId"));

		// Find the product that correspond with the id provided in route.
		this.product = this.productService.getAll().find(product => product.id === productIdFromRoute);
	}

	Buy(product: Product) {
		this.cartService.addToCart(product);
		window.alert("Your product has been added to the cart!");
	}
}
