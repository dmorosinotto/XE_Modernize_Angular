import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private authToken?: string;

	public hasRole(role: string): boolean {
		//FAKE LOGIC
		if (!this.authToken) return false;
		return !((role?.length ?? 0) % 2);
	}

	public Login(username?: string, password?: string) {
		//FAKE LOGIC
		const FAKE_TOKEN = btoa(`${username}:${password}`);
		this.authToken = `Bearer ${FAKE_TOKEN}`;
	}

	public Logout() {
		this.authToken = undefined;
	}

	public addAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
		// Get the auth token from the service.
		if (!this.authToken) return req;
		// Clone the request and replace the original headers with
		// cloned headers, updated with the Authorization (token).
		return req.clone({
			headers: req.headers.set("Authorization", this.authToken)
		});
	}
}
