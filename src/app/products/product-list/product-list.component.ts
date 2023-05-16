import { Component } from "@angular/core";

import { Product, ProductService } from "@app/state/product.service";
import { ProductAlertsComponent } from "../product-alerts/product-alerts.component";
import { RouterLink } from "@angular/router";
import { NgFor, NgIf } from "@angular/common";

@Component({
    selector: "app-product-list",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
    standalone: true,
    imports: [NgFor, RouterLink, NgIf, ProductAlertsComponent]
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
