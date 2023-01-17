---
theme: white
---

# XE Modernize Angular

## Proviamo a evolvere un Applicazione Angular da v12.2 a v15 ci riusciremo!?

**Daniele Morosinotto**
[@dmorosinotto](https://twitter.com/dmorosinotto)

Repo: [https://github.com/dmorosinotto/XE_Modernize_Angular](https://github.com/dmorosinotto/XE_Modernize_Angular)

--

# AGENDA

-   Progetto di partenza v12.2
-   Partiamo da [SCAM](https://dev.to/this-is-angular/emulating-tree-shakable-components-using-single-component-angular-modules-13do)
-   I vari annunci e rilasci di NG
-   DEMO: Proviamo migrazione `ng update`
-   Il _"NUOVO Mental model"_ SCAM -> Optional NgModule -> **NO** NgModule , **standalone**, DI con **inject** , utility _provideRoute, provideHttp_ ...
-   Extra: utilizzo modern _JS tools_
-   Q & A
-   Riferimenti

--

# Intro

## Partiamo con un progetto v12.2 [preso da Qui](https://github.com/wardbell/ngc-validate)

## Le basi NgModule

L'errore più grande del Team di Angular [lo hanno ammesso]()
Ma a cosa serve l'NgModule

-   `declarion + imports + exports` --> definizione del contesto di render/compilazione del template
-   definizione dei providers per la DI
-   Lazy load / creazione dinamica dei componenti

--

## Regredito a SCAM

Perchè io e [altri](https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b) è da un bel pò che vorremmo toglierci di torno gli NgModule

SCAM = Single Component Angular Module

Per toglierci di mezzo gli NgModules ne facciamo uno per componente :-)

---

# I vari annunci / rilasci di NG

-   Siutazione "stagnante" da [NG v9](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296) con l'introduzione di Ivy 7 Feb 2020
-   Novità di [NG v12](https://blog.angular.io/angular-v12-is-now-available-32ed51fbfd49) default `enableIvy:true` Ivy everywhere 13 Mag 2021
-   Novità di [NG v13](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296) 4 Nov 2021
-   Introduzione a [standlone](https://blog.angular.io/an-update-on-standalone-components-ea53b4d55214)
-   Novità di [NG v14](https://blog.angular.io/angular-v14-is-now-available-391a6db736af) 2 Giu 2022
-   Novità di [NG v15](https://blog.angular.io/angular-v15-is-now-available-df7be7f2f4c8) 16 Nov 2022

---

# DEMO: proviamo migrazione

`ng update`

-   Dettaglio guida migrazione [update.angular.io](https://update.angular.io/?v=12.0-15.0)

## Cose da sistemare

-   Lo scopriremo solo in live...

---

# Il _"NUOVO Mental model"_

-   SCAM -> Optional NgModule -> **NO** NgModule ,
-   **standalone** Component / Directive / Pipe,
-   DI con **inject** + injection helper fn al posto del costruttore setto propertà (possibile solo nel contesto di inizializzazione (oppure usando `injector.runInContext(()=>{...})`,
-   utility _provideRoute, provideHttp_ ...
-   Nuovi [pattern DI](https://www.angulararchitects.io/en/aktuelles/patterns-for-custom-standalone-apis-in-angular/?mc_cid=dcfc4a34f9&mc_eid=bca811da1f) che sfruttano _inject_ 

--

## Extra: utilizzo _modern JS tools_

-   esbuild 🤯
-   vite 💚 ⚡️
-   abilitato da standalone + inject vedi [articolo](https://marmicode.io/blog/versatile-angular) + [repo](https://github.com/dmorosinotto/Angular_Vite) per provare dal vivo la differenza

---

## Q&A + REFERENCE

Le "mie" nuove Best Practices: standalone + inject + helper fn + pnpm + vite + esbuild
ALCUNI APPROFONDIMENTI:

-   [video](https://www.youtube.com/watch?v=kE_zr5ZiPWc) Alex Rickabaugh su standalone
-   [articolo](https://blog.nrwl.io/component-first-architecture-with-standalone-components-and-nx-c87559af1f91) su architettura standalone + organizzazione codice con Nx
-   articolo su [inject](https://codereacter.medium.com/why-angular-14s-new-inject-function-is-so-amazing-ac281e7148d1) function e nuovo paradigma DI
-   come creare il contesto inizializzazione [runInContext](https://netbasal.com/getting-to-know-the-runincontext-api-in-angular-f8996d7e00da)
-   esempi e casi d'uso di [inject](https://dev.to/this-is-angular/always-use-inject-2do4)
-   approfondimento sulle novità del [provideRouter](https://blog.angular.io/advancements-in-the-angular-router-5d69ec4c032)
-   approfondimento sulle novità del [provideHttp](https://netbasal.com/using-the-angular-http-client-in-angular-v15-f4bec3c11926)
-   utilizzo dei nuovi tools [vite/esbuild](https://marmicode.io/blog/versatile-angular) abilitati da standalone + inject
-   articolo sull'utilizzo di [TemplateDrive Forms](https://timdeschryver.dev/blog/a-practical-guide-to-angular-template-driven-forms) + [video](https://youtu.be/7koRJKiBQGA) di Ward Bell sull'argomento!
-   bellissimo articolo Manfred su nuovi [pattern DI](https://www.angulararchitects.io/en/aktuelles/patterns-for-custom-standalone-apis-in-angular/?mc_cid=dcfc4a34f9&mc_eid=bca811da1f) introdotti con _inject_ 

---

## FEEDBACK & CONTACT

![Me](https://www.xedotnet.org/media/1032/morosinotto_foto.jpg?height=300)

#### Daniele Morosinotto

**Javascript enthusiast**

-   Twitter [@dmorosinotto](https://twitter.com/dmorosinotto)
-   Email [d.morosinotto@icloud.com](d.morosinotto@icloud.com)
-   Repo [https://github.com/dmorosinotto/XE_Modernize_Angular](https://github.com/dmorosinotto/XE_Modernize_Angular)
