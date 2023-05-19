import { Routes } from "@angular/router";

import { ProductListComponent } from "./product-list/product-list.component";
import { provideProductService } from "@app/state/product.service";

export const PRODUCT_ROUTES: Routes = [
	{
		path: "",
		providers: [provideProductService({ limit: 1 })],
		children: [
			{ path: "", component: ProductListComponent, pathMatch: "full" },
			{
				path: ":productId",
				loadComponent: () => import("./product-details/product-details.component")
			}
		]
	}
];
