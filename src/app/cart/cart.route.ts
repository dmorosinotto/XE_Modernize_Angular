import { Injectable, NgModule } from "@angular/core";
import { RouterModule, Routes, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CartComponent, CartModule } from "./cart.component";
import { CartService } from "@app/state/cart.service";

@Injectable()
export class CanOpenCartIfNotEmpty  {
	constructor(private cartService: CartService) {}

	canActivate(/*
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	*/): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return !this.cartService.isEmpty;
	}
}

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
	{
		path: "",
		component: CartComponent,
		pathMatch: "full",
		canActivate: [CanOpenCartIfNotEmpty],
		canDeactivate: [CanExitCart]
	}
];

@NgModule({
	imports: [RouterModule.forChild(CART_ROUTES), CartModule],
	providers: [CanExitCart, CanOpenCartIfNotEmpty]
})
export class CartLazyModule {}
