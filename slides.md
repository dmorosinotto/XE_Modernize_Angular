---
theme: white
---

![XE ONE DAY - Modernize Angular App - Daniele Morosinotto](images/xeoneday.jpeg)

--

![Un ringraziamento agli sponsor](images/sponsor.jpeg)

---

## UN PO' DI STORIA

![INTRO](images/intro.jpeg)

### INTRO: I vari annunci e rilasci di NG:

- 06 Feb 2020 - [NG v9](https://blog.angular.io/version-9-of-angular-now-available-project-ivy-has-arrived-23c97b63cfa3) inizio adozione _Ivy_ - periodo stagnazione ~~COVID~~ + lavori interni ViewEngine->Ivy
- 04 Nov 2021 - [NG v13](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296) **Ivy everywhere** (app+lib)
- 06 Feb 2022 - [RFC](https://blog.angular.io/an-update-on-standalone-components-ea53b4d55214) si inizia a parlare di _Standalone_ 
- 02 Giu 2022 - [NG v14](https://blog.angular.io/angular-v14-is-now-available-391a6db736af) _preview_ di Standalone comp
- 16 Nov 2022 - [NG v15](https://blog.angular.io/angular-v15-is-now-available-df7be7f2f4c8) stable **Standalone & API**
- 15 Feb 2023 - intro Alex a [Signal](https://github.com/angular/angular/discussions/49090) + discussione [RFC](https://github.com/angular/angular/discussions/49685) 
- 03 Mag 2023 - [NG v16](https://blog.angular.io/angular-v16-is-here-4d7a28ec680d) _preview_ di **Signal**, ma manca: signalComponent NG v17/18+ (zoneless in futuro...)

--

## AGENDA

![AGENDA](images/agenda.jpeg)

- FEATURE PRINCIPALI:
    - **Standalone** Component -(SCAM)-> _optional NgModule_
    - Migrazione `ng g @angular/core:standalone` + qualche fix: AppComponent + SCAM exports
    - **StandaloneAPI** ottimizzazione (“tree-shaking”) 
        + nuovo —> _bootstrapApplication_
        + **provideHttp** + withInterceptorXXX functional 
        + **provideRoute**: nuovo Lazy loadComponent / loadChildren —> ROUTES
        - inizializzazione withXXX + functional Guard + uso dei providers su Route
    - **inject** function: dal ctor —> field + infer INJTOKEN + helpers injectParam(name) + attenzione al runInInjectorContext!
- OPINIONI PERSONALI SU ALTRE FEATURES:
    - **Signal**: “the elefant in the room” cos’è come lo usiamo adesso e in futuro?!…
    - Accenni a directiveHosts / strict Typed ReactiveForms / img[ngSrc] & altre utili: _@Input({required}) / withComponentInputBinding / DestroyRef / takeUntilDestoryed_
- EXTRA: Utilizzo di modern JS tools: esbuild + Vite | CONCLUSIONI: Q & A + Riferimenti

--

## Le basi @NgModule

- Igor: _“L’errore più grande del Team di Angular”_
- Ma a cosa serve l’@NgModule:
    - definizione del contesto di compilazione/scope del template: **declarations, imports, exports**
    - definizione dei **providers** per inizializzare la DI
    - entrypoint per **Lazy load** / creazione dinamica

### DECISAMENTE UN PO’ TROPPO! 
- Tra l’altro il tutto con lo scopo di definire/usare i `@Component` che sono i veri _building block_ dell'App

### [DEMO 01](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/00...01) sample NgModule

--

## SCAM

> Soluzione tampone fino a NG13: 
Perchè io e [altri](https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b) è da un bel pò che vorremmo toglierci di torno gli @NgModule - alla fine ne facciamo centinaia :-/   

**SCAM** = **S**ingle **C**omponent **A**ngular ng**M**odule

INLINE nello stesso file del `@Component` per facilitare il riuso+definizione del suo **SCOPE** template/compile! 

### [DEMO 02](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/01...02) sample SCAM

--

## Standalone @Component

```diff
@Component({
    selector: "app-some-cmp",
    template: `...`,
+   standalone: true,
+   imports: [OtherStandaloneCmp, LegacyModule, NgIf]
})
export class SomeComponent {...}
```

- Pieno **INTEROP** con NgModule in **entrambi i versi**!
- standalone @Directive/@Pipe -> Optional NgModule
    - più chiare dipendenze dirette (template scope)
    - più chiaro anche dove definire i providers (DI)
    - facilita creazione dinamica [VCR](https://v13.angular.io/api/core/ViewContainerRef#createComponent).[createComponet](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296#8f39)

COMPONENT PILAR: Finalmente i `@Component` sono i **VERI BUILDING BLOCK** delle Applicazioni Angular!

---

## MIGRAZIONE - CLI 15.2+

```bash
ng generate @angular/core:standalone
? Choose the type of migration: (Use arrow keys)
❯ Convert all components, directives and pipes to standalone 
  Remove unnecessary NgModule classes 
  Bootstrap the application using standalone APIs
```
Migrazione in 3 passi + richiede qualche **FIX a mano**: 
- SCAM spostare `providers` su comp prima del 2°
- AppComponent riportare `imports` deps dopo 3°

### [DEMO 11](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/02...11) migrate 1°
### [DEMO 12](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/11...12) fix SCAM + 2°
### [DEMO 13](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/12...13) fix App.Comp + 3° 

---

## StandaloneAPI - provideHttp

- La migrazione sistema `bootstrapApplication` + usa `provideHttp` ma **NO ROUTING** nuovo!?!
- Alcune modifiche che possiamo fare: 
    - cambiare AuthInterceptor riscrivendolo **funzionale** + uso di _inject_ per la DI!
    - utilizzo `withInterceptors` per caricare direttamente le _HttpInterceptorFn_ in alternativa a _withInterceptorsFromDi_ che usava la vecchia class.

### [DEMO 20](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/13...20) provideHttp + InterceptorFn

---

## provideRouter + fnGuard

- Per migliorare "tree-shaking" possiamo usare **provideRouter** ### [DEMO 30](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/20...30)
- Nuova sintassi **Lazy** `loadChildren` che punta direttamente a _ROUTES_ ### [DEMO 31](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/30...31)
- Utilizzo dei `providers` direttamente nelle _Route_ (elimino NgModule) ### [DEMO 32](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/31...32)
- Possibilità caricare direttamente `loadComponent` -> Standalone Component ### [DEMO 33](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/32...33) + posso usare `export default` ### [DEMO 34](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/33...34)
- Semplifico scrittura RouteGuard `canXYZ` in modo **funzionale**! ### [DEMO 35](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/34...35) ### [DEMO 36](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/35...36)

---

## NEW DI - inject() [DEMO 40](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/36...40)

```diff
export class InAComponentOrService {
-   constructor(public someService: SomeService) {...} //BEFORE ctor
+   someService = inject(SomeService); //NOW you can use field=inject
}
```
- Vantaggio: **infer** automatico del tipo di ritorno (utile per `InjectionToken` _type-safe_) ### [DEMO 41](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/40...41)
- Semplifica caso di classi Ereditate **NON** ho più bisogno di ripassare dipendeze `super(srvBase)`
- Possibile scrivere **helper** per riutilizzo logica `injectFn` vedi ### [DEMO 42 - initFrm()](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/41...42) 
- ma Attenzione a dove chiamiamo l'helper _injectPar()_ può servire `runInInjectionContext` [DEMO 43](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/42...43)
- Nuovi DI pattern utilizzo provideXXX con Config ### [DEMO 44 - initFrm()](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/43...44) 

---

## Typed ReactiveForms [DEMO 45](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/44...45)

![INTELLISENCE](images/intellisence.gif)

> Secondo me 👎 1) Sbagliato Naming! 2) Migra `Untyped` 3) troppo **Incasinati** gli oggetti/tipi _strict_ che hanno scritto! 4) **Troppo tardi**! _dopo 7 anni_ molti si son fatti [altre soluzioni](https://github.com/ngneat/reactive-forms) soprattutto per gestire [Form dinamiche](https://formly.dev/)!

--

### hostDirectives ###[DOCS](https://angular.io/guide/directive-composition-api)

- _Composition vs Inheritance_ per far mix&match di più direttive **standalone** rimappando @Input/@Output
```
@Directive({ standalone:true, ...})
export class Menu { }

@Directive({ standalone: true,...})
export class Tooltip { }

// MenuWithTooltip can compose behaviors from other directives
@Component({
  selector: 'menu-with-tooltip',
  template: './menu-with-tooltip.html',
  hostDirectives: [ Tooltip, {
    directive: Menu,
    inputs: ['menuId: id'],
    outputs: ['menuClosed: closed'],
  }],
})
export class MenuWithTooltipComponent { }
```

--

## NgOptimizedImage ###[DOCS](https://angular.io/api/common/NgOptimizedImage)
- Utilizzo tag `<img [ngSrc]=...>` per migliorare _LCP_ e gestire in modo ottimale caricamento immagini (preload/lazy) con possibilità di impostare _providers_ **IMAGE_LOADER** per utilizzare CDN (es: Cloudflare) o di ContentManagment (es: Cloudinary)

![LCP](images/lcp.png)

---

## MIGRARE A NG16 

La migrazione a NG16 porta alcune **novità utili**:
```
ng update @angular/cli@16 @angular/core@16
```

- `runInInjectionContext` **fix** _injPar()_ [DEMO 46](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/45...46)
-  `withComponentInputBinding` [DEMO 47](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/46...47)
- @Input({**required**}) con assert automatico [DEMO 48](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/47...48)
- `DestoryRef` per gestire dinamicamente OnDestroy -> utile per gestire tramite _inject()_ il pattern **takeUntilDestory** [DEMO 49](https://github.com/dmorosinotto/XE_Modernize_Angular/compare/48...49)

-- 

# SIGNALS: "Elefant in the room"
Spiegare le basi: è una nuova PRIMITIVA per gestire REACTIVITY -> con lo scopo di miglioare la changeDetection rendendola puntuale!
Praticamente è: 
- un contenitore di valori (Producer/Consumer + track deps & Notify)
- che espone un getter () che ritorna in modo efficace "memoized" il valore corrente, ma internamente fa anche il tracciamento automatico di chi lo va ad utilizzare/leggere
- ha una serie di metodi per cambiare valore: set/update/mutate che scatena Notifiche di cambiamento, per far partire auto-ricalcolo Lazy (push/pull che dovrebbe garantire "glitch-free")

Opinione un pò "contrastante" perchè:
0. Mi piace **computed** + richiamo () su template no problem
1. Non è ancora chiaro come usarlo / anti-pattern (vedi gestione async / effect con writeSignal)
2. Il grosso vantaggio arriverà quando avremo Signal component v17-18
3. In prima battuta potrebbe venire comodo per avere nuovo modo di evitare subscription |async usando toSignal(obs) che gestisce in automatico unsubscribe e inolte mi da subito disponibile lato codice/template il valore corrente così da scrivere logica imperativa / computed senza incorrere errori doble-subscribe!
4. Forse essendo una primitiva reactivity avremo i maggiori vantaggi nelle integrazioni di nuove lib per statemanagemnt -> ritorno Signal al posto di Obs vedi ngRxSignalStore
5. Comunque richiede una riscrittura manuale +/- pesante del codice che attualmente è organizzato in base agli Observable RxJS...

Comunque sono sicuramente da tenere d'occhio in questi 1-2anni per capirli bene e prepararsi ad utilizzarli al meglio quando sarà completo il quadro di utilizzo e i vantaggi: Granular CD + Zoneless!

--

## **REF / SPUNTI**
- [RFC Signal](https://github.com/angular/angular/discussions/49685)
- Manfred [Video uso/conversine](https://www.youtube.com/live/7wfwlAIY4jE?feature=share)
- Bell'articolo che riassume Signal e meccanismo [Push/Pull](https://priyank-bhardwaj.medium.com/how-angular-signals-solves-an-age-old-problem-ae7ec60f042f) di aggiornamento!
- Signal demystified articolo per capire quirks [Tomas Trajan](https://angularexperts.io/blog/angular-signals-push-pull)
- DOCS Ufficiale NG16 [Signals](https://rc.angular.io/guide/) + [rxjs-interop](https://rc.angular.io/guide/rxjs-interop)  
- ESEMPIO NG16 [NgRxSignalStore Playground](https://github.com/dmorosinotto/NG16-signal-store-playground)  
- RFC NGRX integrazione [selectSignal](https://github.com/ngrx/platform/discussions/3843) + nuovo [SignalStore](https://github.com/ngrx/platform/discussions/3796)  
- Rilascio NGRX v16 [selectSignal](https://dev.to/ngrx/announcing-ngrx-v16-integration-with-angular-signals-functional-effects-standalone-schematics-and-more-5gk6)
- idee simili anche per RFC [MiniRX SignalStore](https://github.com/spierala/mini-rx-store/discussions/188) 
- Novità Angular 16 [GoogleIO video](https://io.google/2023/program/ebab5344-0315-44d2-8923-4571c537e3bb)
- Riassunto altre novità/[utilità "minori"](https://levelup.gitconnected.com/angular-16-is-making-big-noise-6a06e9808788) Angular16
- Bellissimo [REPO MANFRED](https://github.com/manfredsteyer/standalone-example-cli/tree/signal-store) con vari esperimenti uso Signal (ultimo signal-store con nested signal e reattività alla SolidJS)

---


## Extra: utilizzo _modern JS tools_

-   esbuild 🤯
-   vite 💚 ⚡️
-   abilitato da standalone + inject vedi [articolo](https://marmicode.io/blog/versatile-angular) + [repo](https://github.com/dmorosinotto/Angular_Vite) per provare dal vivo la differenza


---


## Q&A + REFERENCE

Le "mie" nuove Best Practices: standalone + inject + helper fn + pnpm + vite + esbuild
ALCUNI APPROFONDIMENTI:

- Bellissimo [VIDEO MANFRED](https://www.youtube.com/watch?v=MaCK8naSH7A ) per ispirazione/concetti talk: Standalone / inject + customconfig / Signal basics

---

## CONCLUSIONI
SPECULAZIONI SUL FUTURO (Magari per le conclusioni...)
Futuro v16 Signal (grande cambio ma non son sicuro perchè Rx molto usato&odiato) stanno seguendo stessi passi: Apr 2023 Alex parla dei concetti di Signal -> RFC pubblica v16 Mag 2023 preview -> entro fine anno 2023-2024 v17 (forse introduzione signal component)/v18+ rilascio completo Signal (SUPPOSIZIONI ma sarà lungo tempo x adozione perchè cambia radicale, pattern non ancora ben chiari in più difficile migrare codebase da Rx->Signal, magari viene comodo x sostiture subscribtion |async usando toSignal, cmq è una primitiva e forse sarà utile "piu utile" nelle nuove lib di Statemanagement)

---


## FEEDBACK & CONTACT

![Me](https://www.xedotnet.org/media/1032/morosinotto_foto.jpg?height=300)

#### Daniele Morosinotto

**Javascript enthusiast**

-   Twitter [@dmorosinotto](https://twitter.com/dmorosinotto)
-   Email [d.morosinotto@icloud.com](d.morosinotto@icloud.com)
-   Repo [https://github.com/dmorosinotto/XE_Modernize_Angular](https://github.com/dmorosinotto/XE_Modernize_Angular)
