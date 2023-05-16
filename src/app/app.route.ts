import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "@app/state/auth";
import { ToggleLoginOutComponent } from "./shell";

export const APP_ROUTES: Routes = [
	{ path: "", redirectTo: "/products", pathMatch: "full" },
	{ path: "login", component: ToggleLoginOutComponent },
	{
		path: "products",
		canLoad: [AuthGuard],
		data: { role: "USER" },
		loadChildren: () => import("./products/products.route").then(m => m.ProductsLazyModule)
	},
	{
		path: "cart",
		canActivate: [AuthGuard],
		loadChildren: () => import("./cart/cart.route").then(m => m.CartLazyModule)
	}
];
@NgModule({
	imports: [RouterModule.forRoot(APP_ROUTES, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
