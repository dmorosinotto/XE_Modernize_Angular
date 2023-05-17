import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { ProductAlertsComponent } from "./product-alerts/product-alerts.component";
// import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { provideProductService } from "@app/state/product.service";

export const PRODUCT_ROUTES: Routes = [
	{
		path: "",
		providers: [provideProductService(1)],
		children: [
			{ path: "", component: ProductListComponent, pathMatch: "full" },
			{
				path: ":productId",
				loadComponent: () =>
					import("./product-details/product-details.component").then(m => m.ProductDetailsComponent)
			}
		]
	}
];
