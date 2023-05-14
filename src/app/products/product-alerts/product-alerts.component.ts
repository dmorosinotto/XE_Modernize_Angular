import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "@shared/FAKE_products";

@Component({
	selector: "app-product-alerts",
	templateUrl: "./product-alerts.component.html"
})
export class ProductAlertsComponent {
	@Input() product?: Product;
	@Input() limit!: number;
	@Output() notify = new EventEmitter<number>();
}
