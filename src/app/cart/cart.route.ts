import { Injectable, NgModule, inject } from "@angular/core";
import { RouterModule, Routes, UrlTree, CanActivateFn, CanDeactivateFn } from "@angular/router";
import { Observable } from "rxjs";
import { CartComponent } from "./cart.component";
import { CartService } from "@app/state/cart.service";

export const CanOpenCartIfNotEmpty: CanActivateFn = () => {
	const cartService = inject(CartService);
	return !cartService.isEmpty;
};

export const CanExitCart: CanDeactivateFn<CartComponent> = component => {
	return component.isSaved;
};

export const CART_ROUTES: Routes = [
	{
		path: "",
		component: CartComponent,
		pathMatch: "full",
		canActivate: [CanOpenCartIfNotEmpty],
		canDeactivate: [CanExitCart]
	}
];
