import { Routes } from "@angular/router";

import { canActivate, canLoad } from "@app/state/auth";
import { ToggleLoginOutComponent } from "./shell";

export const APP_ROUTES: Routes = [
    { path: "", redirectTo: "/products", pathMatch: "full" },
    { path: "login", component: ToggleLoginOutComponent },
    {
        path: "products",
        canMatch: [canLoad],
        data: { role: "USER" },
        loadChildren: () => import("./products/products.route").then((m) => m.PRODUCT_ROUTES),
    },
    {
        path: "cart",
        canActivate: [canActivate],
        loadChildren: () => import("./cart/cart.route"),
    },
    { path: "signal", loadComponent: () => import("./signal/signal.component") },
];
