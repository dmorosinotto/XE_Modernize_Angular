import { inject } from "@angular/core";
import { Routes, CanDeactivateFn, CanActivateFn } from "@angular/router";
import { CartComponent } from "./cart.component";
import { CartService } from "@app/state/cart.service";

export const canOpenCartIfNotEmpty: CanActivateFn = () => {
	const cartService = inject(CartService); //USO inject PER DI!!
	return !cartService.isEmpty;
};

export const canExitCart: CanDeactivateFn<CartComponent> = component => {
	return component.isSaved;
};

const CART_ROUTES: Routes = [
	{
		path: "",
		component: CartComponent,
		pathMatch: "full",
		canActivate: [canOpenCartIfNotEmpty],
		canDeactivate: [canExitCart]
	}
];
export default CART_ROUTES;
