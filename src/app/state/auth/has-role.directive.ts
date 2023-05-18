import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef, NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { Subscription } from "rxjs";

@Directive({
    selector: "[hasRole]",
    standalone: true
})
export class HasRoleDirective {
	constructor(
		private auth: AuthService,
		private _templateRef: TemplateRef<any>,
		private _viewContainer: ViewContainerRef
	) {}

	private _role?: string;
	@Input() public set hasRole(role: string) {
		if (this._role !== role) {
			this._role = role;
			this._updateView();
		}
	}

	private _sub?: Subscription;
	private _viewRef?: EmbeddedViewRef<any>;
	private _updateView() {
		this._cleanUp(this._sub);
		this._sub = this.auth.hasRole$(this._role).subscribe(visible => {
			if (visible) {
				if (!this._viewRef) {
					this._viewRef = this._viewContainer.createEmbeddedView(this._templateRef);
				}
			} else {
				this._cleanUp();
			}
		});
	}

	private _cleanUp(sub?: Subscription) {
		if (sub) sub.unsubscribe();
		if (this._viewRef) {
			this._viewContainer.clear();
			this._viewRef = undefined;
		}
	}

	ngOnDestroy() {
		this._cleanUp(this._sub);
	}
}

//SAMPLE SCAM DIRECTIVE
@NgModule({
    imports: [HasRoleDirective],
    exports: [HasRoleDirective]
})
export class HasRoleModule {}
