import { Injectable, NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate, CanDeactivate, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CartComponent } from "./cart.component";
import { CartService } from "@app/state/cart.service";

@Injectable({ providedIn: "root" })
export class CanOpenCartIfNotEmpty implements CanActivate {
	constructor(private cartService: CartService) {}

	canActivate(/*
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	*/): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return !this.cartService.isEmpty;
	}
}

@Injectable({ providedIn: "root" })
export class CanExitCart implements CanDeactivate<CartComponent> {
	canDeactivate(
		component: CartComponent
		// currentRoute: ActivatedRouteSnapshot,
		// currentState: RouterStateSnapshot,
		// nextState?: RouterStateSnapshot | undefined
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return component.isSaved;
	}
}

const CART_ROUTES: Routes = [
	{
		path: "",
		component: CartComponent,
		pathMatch: "full",
		canActivate: [CanOpenCartIfNotEmpty],
		canDeactivate: [CanExitCart]
	}
];
export default CART_ROUTES;
