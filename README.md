# XE_Modernize_Angular

XE Modernize Angular - Session

-   My [Slides](slides.md) in 🇮🇹
-   If you want to follow all the _migration steps_ that I've done to upgrade my sample application from **NG13 -> NG15 + Standalone -> NG16 + Signal** execute this:

```terminal
git clone https://github.com/dmorosinotto/XE_Modernize_Angular
cd XE_Modernize_Angular
git fetch --all --tags

pnpm install
```

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.7.

```shell
ng new XE-Modernize-Angular --minimal -s -t -S --routing --strict --packageManager pnpm
```

## Development server

Run `pnpm run start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Update Angular @VER

Run `ng update @angular/cli@VER @angular/core@VER` to upgrade Angular to a specific **VER**.

## Migrate to Standalone

REQUIRED CLI **15.2+** Run `ng g @angular/core:standalone` and execute the 3 steps in order to migrate to Standalone + some **FIX**.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
