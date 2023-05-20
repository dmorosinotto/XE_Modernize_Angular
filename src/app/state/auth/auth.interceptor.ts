import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const auth = inject(AuthService); //USO inject PER DI!!
	// send cloned request with Authorization Header to the next handler.
	return next(auth.addAuthorizationHeader(req));
};
