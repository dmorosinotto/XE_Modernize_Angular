import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { ProductAlertsComponent } from "./product-alerts/product-alerts.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { provideProductService } from "@app/state/product.service";

export const PRODUCT_ROUTES: Routes = [
	{ path: "", component: ProductListComponent, pathMatch: "full" },
	{ path: ":productId", component: ProductDetailsComponent }
];

@NgModule({
    // exports: [ProductListComponent, ProductDetailsComponent, ProductAlertsComponent],
    imports: [RouterModule.forChild(PRODUCT_ROUTES), CommonModule, ProductListComponent, ProductDetailsComponent, ProductAlertsComponent],
    providers: [provideProductService]
})
export class ProductsLazyModule {}
