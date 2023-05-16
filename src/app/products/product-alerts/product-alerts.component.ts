import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { Product } from "@app/state/product.service";

@Component({
	selector: "app-product-alerts",
	templateUrl: "./product-alerts.component.html",
	styles: [":host { display: inline-flex }"]
})
export class ProductAlertsComponent implements OnInit {
	@Input() product?: Product;
	@Output() notify = new EventEmitter<number>();
	@Input() limit!: number; //ASSERTION REQUIRED

	ngOnInit(): void {
		console.assert(this.limit !== null, "MUST specify 'limit' @Input!");
	}
}
