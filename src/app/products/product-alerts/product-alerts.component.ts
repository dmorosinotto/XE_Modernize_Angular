import { Component, EventEmitter, input, output, OnInit, computed } from "@angular/core";
import { Product } from "@app/state/product.service";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-product-alerts",
    templateUrl: "./product-alerts.component.html",
    styles: [":host { display: inline-flex }"],
    standalone: true,
    imports: [NgIf],
})
export class ProductAlertsComponent {
    product = input<Product>();
    notify = output<number>();
    limit = input.required<number>(); //ASSERTION SU OnINIT NON PIU NECESSARIA
    showNotifyButton = computed(() => {
        const product = this.product();
        if (!product) return false; //null or undefined
        return product.price < this.limit();
    });
}
