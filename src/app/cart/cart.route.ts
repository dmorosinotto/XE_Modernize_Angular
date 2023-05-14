import { Injectable, NgModule } from "@angular/core";
import { RouterModule, Routes, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CartComponent, CartModule } from "./index";

@Injectable()
export class CanExitCart  {
	canDeactivate(
		component: CartComponent
		// currentRoute: ActivatedRouteSnapshot,
		// currentState: RouterStateSnapshot,
		// nextState?: RouterStateSnapshot | undefined
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return component.isSaved;
	}
}

export const CART_ROUTES: Routes = [
	{ path: "", component: CartComponent, pathMatch: "full", canDeactivate: [CanExitCart] }
];

@NgModule({
	imports: [RouterModule.forChild(CART_ROUTES), CartModule],
	providers: [CanExitCart]
})
export class CartLazyModule {}
