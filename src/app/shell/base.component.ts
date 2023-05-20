import { Directive, DestroyRef, inject } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

const injectTakeUntilDestroy = () => {
	console.info("ADESSO CREO _destory$");
	const _destroy$ = new Subject<void>();
	inject(DestroyRef).onDestroy(() => {
		console.info("EQUIVALE A ngOnDestory");
		_destroy$.next();
		_destroy$.complete();
	});
	return takeUntil<any>(_destroy$);
};

@Directive()
export abstract class BaseComponent {
	protected takeUntilDestroy = injectTakeUntilDestroy;
}
