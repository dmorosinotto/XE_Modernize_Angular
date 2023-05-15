import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDetailsComponent, ProductListComponent } from "./index";

export const PRODUCT_ROUTES: Routes = [
	{ path: "", component: ProductListComponent, pathMatch: "full" },
	{ path: ":productId", component: ProductDetailsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(PRODUCT_ROUTES)]
})
export class ProductsLazyModule {}
