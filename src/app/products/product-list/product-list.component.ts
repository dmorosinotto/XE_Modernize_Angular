import { Component } from "@angular/core";

import { Product, FAKE_PRODUCTS, PRICE_LIMIT } from "@shared/FAKE_products";

@Component({
	selector: "app-product-list",
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent {
	products = FAKE_PRODUCTS;
	price_limit = PRICE_LIMIT;

	share(p: Product) {
		window.alert(`The product ${p.id} has been shared!`);
	}

	onNotify(price: number) {
		window.alert("You will be notified when the product goes on sale! Actually $" + price);
	}
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
