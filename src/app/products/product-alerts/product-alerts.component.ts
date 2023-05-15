import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "@shared/FAKE_products";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-product-alerts",
    templateUrl: "./product-alerts.component.html",
    standalone: true,
    imports: [NgIf]
})
export class ProductAlertsComponent {
	@Input() product?: Product;
	@Input() limit!: number;
	@Output() notify = new EventEmitter<number>();
}
