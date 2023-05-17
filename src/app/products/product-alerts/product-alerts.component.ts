import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { Product } from "@app/state/product.service";
import { NgIf } from "@angular/common";

@Component({
	selector: "app-product-alerts",
	templateUrl: "./product-alerts.component.html",
	styles: [":host { display: inline-flex }"],
	standalone: true,
	imports: [NgIf]
})
export class ProductAlertsComponent {
	@Input() product?: Product;
	@Output() notify = new EventEmitter<number>();
	@Input({ required: true }) limit!: number;
}
