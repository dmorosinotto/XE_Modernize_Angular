import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private _authToken = new BehaviorSubject("");
	public isLoggedIn(): boolean {
		return !!this._authToken.getValue();
	}

	public isLogged$ = this._authToken.pipe(map(Boolean));

	public hasRole$(role?: string): Observable<boolean> {
		return this._authToken.pipe(
			map(token => {
				if (!token) return false; //FAKE LOGIC
				return !((role?.length ?? 0) % 2);
			})
		);
	}

	public Login(username?: string, password?: string) {
		//FAKE LOGIC
		const FAKE_TOKEN = btoa(`${username}:${password}`);
		this._authToken.next(`Bearer ${FAKE_TOKEN}`);
	}

	public Logout() {
		this._authToken.next("");
	}

	public addAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
		// Get the auth token from the service.
		const token = this._authToken.getValue();
		if (!token) return req;
		// Clone the request and replace the original headers with
		// cloned headers, updated with the Authorization (token).
		return req.clone({
			headers: req.headers.set("Authorization", token)
		});
	}
}
