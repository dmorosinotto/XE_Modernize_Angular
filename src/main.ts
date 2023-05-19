import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { AppRoutingModule } from "./app/app.route";
import { withInterceptors, provideHttpClient } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { authInterceptor } from "@app/state/auth";

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(BrowserModule, AppRoutingModule),
		provideHttpClient(withInterceptors([authInterceptor]))
	]
}).catch(err => console.error(err));
