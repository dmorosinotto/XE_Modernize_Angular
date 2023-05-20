import { Injectable, Injector, Signal, computed, inject, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private _authToken = signal("");
	public isLoggedIn = computed(() => !!this._authToken());

	public isLogged$ = toObservable(this.isLoggedIn);

	private _injector = inject(Injector); //NECESSARIO PER AVER CONTESTO PER toObservable
	public hasRole$(role?: string): Observable<boolean> {
		//ALTRIMENTI IL METODO A RUNTIME ESPLODEVA PERCHE' USA runInInjectionContext INTERNAMENTE
		return toObservable(this.hasRole(role), { injector: this._injector });
	}
	public hasRole(role?: string): Signal<boolean> {
		return computed(() => {
			if (!this.isLoggedIn()) return false;
			return !((role?.length ?? 0) % 2);
		});
	}

	public Login(username?: string, password?: string) {
		//FAKE LOGIC
		const FAKE_TOKEN = btoa(`${username}:${password}`);
		this._authToken.set(`Bearer ${FAKE_TOKEN}`);
	}

	public Logout() {
		this._authToken.update(oldToken => "");
	}

	public addAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
		// Get the auth token from the service.
		const token = this._authToken();
		if (!token) return req;
		// Clone the request and replace the original headers with
		// cloned headers, updated with the Authorization (token).
		return req.clone({
			headers: req.headers.set("Authorization", token)
		});
	}
}
