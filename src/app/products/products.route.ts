import { Routes } from "@angular/router";

import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { provideProductService } from "@app/state/product.service";

export const PRODUCT_ROUTES: Routes = [
	{
		path: "",
		providers: [provideProductService],
		children: [
			{ path: "", component: ProductListComponent, pathMatch: "full" },
			{ path: ":productId", component: ProductDetailsComponent }
		]
	}
];
