import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpInterceptorFn } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const auth = inject(AuthService);
	return next(auth.addAuthorizationHeader(req));
};

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
// 	constructor(private auth: AuthService) {}

// 	intercept(req: HttpRequest<any>, next: HttpHandler) {
// 		// send cloned request with Authorization Header to the next handler.
// 		return next.handle(this.auth.addAuthorizationHeader(req));
// 	}
// }

// export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
