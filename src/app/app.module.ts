import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.route";
import { httpInterceptorProviders } from "./shared/auth.interceptor";
import { ShellModule } from "src/app/shell";

@NgModule({
	imports: [BrowserModule, HttpClientModule, AppRoutingModule, ShellModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers: [httpInterceptorProviders]
})
export class AppModule {}
