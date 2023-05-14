import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "/products", pathMatch: "full" },
	{
		path: "products",
		loadChildren: () => import("./products/products.route").then(m => m.ProductsLazyModule)
	},
	{
		path: "cart",
		loadChildren: () => import("./cart/cart.route").then(m => m.CartLazyModule)
	}
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
