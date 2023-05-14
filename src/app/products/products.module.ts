import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ProductAlertsComponent } from "./product-alerts/product-alerts.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductListComponent } from "./product-list/product-list.component";

@NgModule({
	declarations: [ProductListComponent, ProductDetailsComponent, ProductAlertsComponent],
	exports: [ProductListComponent, ProductDetailsComponent, ProductAlertsComponent],
	imports: [CommonModule, RouterModule]
})
export class ProductsModule {}
