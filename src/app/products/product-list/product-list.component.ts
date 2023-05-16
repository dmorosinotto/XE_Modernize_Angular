import { Component } from "@angular/core";

import { Product, ProductService } from "@app/state/product.service";

@Component({
	selector: "app-product-list",
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent {
	constructor(private productService: ProductService) {}

	products = this.productService.getAll();
	price_limit = this.productService.LIMIT;

	share(p: Product) {
		window.alert(`The product ${p.name} has been shared!`);
	}

	onNotify(price: number) {
		window.alert("You will be notified when the product will be updated! Actually $." + price);
	}
}
