import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef, effect, Injector } from "@angular/core";
import { AuthService } from "./auth.service";

@Directive({
	selector: "[hasRole]",
	standalone: true
})
export class HasRoleDirective {
	constructor(
		private _injector: Injector,
		private auth: AuthService,
		private _templateRef: TemplateRef<any>,
		private _viewContainer: ViewContainerRef
	) {}

	private _role?: string;
	@Input() public set hasRole(role: string) {
		if (this._role !== role) {
			this._role = role;
			console.warn("CREATE NEW computed + effect");
			const computedHasRole = this.auth.hasRole(role);
			effect(
				() => {
					let visible = computedHasRole();
					console.log("NOW VISIBLE", visible, " TO ", role);
					if (visible) this._viewRef = this._viewContainer.createEmbeddedView(this._templateRef);
					else if (this._viewRef) {
						this._viewContainer.clear();
						this._viewRef = undefined;
					}
				},
				{ injector: this._injector }
			);
		}
	}

	private _viewRef?: EmbeddedViewRef<any>;
}

//SAMPLE SCAM DIRECTIVE
