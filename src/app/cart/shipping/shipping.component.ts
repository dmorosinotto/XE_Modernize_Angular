import { Component, Injector, computed, inject, model } from "@angular/core";
import { NgClass, NgFor, AsyncPipe, CurrencyPipe } from "@angular/common";
import { FormControl } from "@angular/forms";

import { ShippingService, IShipping } from "./shipping.service";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-shipping",
    templateUrl: "./shipping.component.html",
    styles: [".error { color: red }"],
    providers: [ShippingService],
    standalone: true,
    imports: [NgClass, NgFor, AsyncPipe, CurrencyPipe],
})
export class ShippingComponent {
    #injector = inject(Injector);
    shippingCosts = toSignal(
        inject(ShippingService).getShippingPrices(), //unsubcribe AUTOMATICO GARANTITO toSignal
        { initialValue: [] as IShipping[], injector: this.#injector } //DEFINISCE 1° VALORE EMESSO - ALTRIMENTI undefined
    ); //infer Singal<IShipping[]>

    shipCost = model<number>(0, { alias: "cost" }); //infer Signal<number>
    $invalid = computed(() => !this.shipCost()); //infer Signal<boolean>

    setCost(price: number) {
        this.shipCost.set(price);
    }
}

//SAMPLE SCAM WITH PROVIDERS
