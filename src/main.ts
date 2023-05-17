import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { APP_ROUTES } from "./app/app.route";
import { withInterceptorsFromDi, provideHttpClient, withInterceptors } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { /*httpInterceptorProviders, */ authInterceptor } from "@app/state/auth";
import { provideRouter, withHashLocation } from "@angular/router";

bootstrapApplication(AppComponent, {
	providers: [
		// importProvidersFrom(BrowserModule),
		provideRouter(APP_ROUTES, withHashLocation()),
		// httpInterceptorProviders,
		// provideHttpClient(withInterceptorsFromDi())
		provideHttpClient(withInterceptors([authInterceptor]))
	]
}).catch(err => console.error(err));
