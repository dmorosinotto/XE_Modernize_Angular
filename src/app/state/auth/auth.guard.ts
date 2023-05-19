import { inject } from "@angular/core";
import { CanActivateFn, CanMatchFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const canActivate: CanActivateFn = () => {
	const auth = inject(AuthService);
	return auth.isLoggedIn();
};

export const canLoad: CanMatchFn = route => {
	const auth = inject(AuthService);
	const router = inject(Router);
	if (!auth.isLoggedIn()) return router.parseUrl("/login");
	else return auth.hasRole$(route?.data?.role);
};
