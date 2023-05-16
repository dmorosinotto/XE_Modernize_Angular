import { Product } from "./product.service";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class CartService {
	private items: Product[] = [];

	addToCart(product: Product) {
		this.items.push(product);
	}

	getItems() {
		// return this.items.slice()
		return [...this.items];
	}

	get isEmpty(): boolean {
		return !(this.items ?? []).length;
	}

	clearCart() {
		this.items = [];
		return this.items;
	}
}
