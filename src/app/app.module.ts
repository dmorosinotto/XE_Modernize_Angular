import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.route";
import { ShellModule } from "@app/shell";
import { httpInterceptorProviders } from "@app/state/auth";

@NgModule({
	imports: [BrowserModule, HttpClientModule, AppRoutingModule, ShellModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers: [httpInterceptorProviders]
})
export class AppModule {}
