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

--

## Regredito a SCAM

Perchè io e [altri](https://medium.com/marmicode/your-angular-module-is-a-scam-b4136ca3917b) è da un bel pò che vorremmo toglierci di torno gli NgModule

---

# I vari annunci / rilasci di NG

-   Novità di [NG v13](https://blog.angular.io/angular-v13-is-now-available-cce66f7bc296) 4 Nov 2021
-   Introduzione a [standlone](https://blog.angular.io/an-update-on-standalone-components-ea53b4d55214)
-   Novità di [NG v14](https://blog.angular.io/angular-v14-is-now-available-391a6db736af) 2 Giu 2022
-   Novità di [NG v15](https://blog.angular.io/angular-v15-is-now-available-df7be7f2f4c8) 16 Nov 2022

---

# DEMO: proviamo migrazione

`ng update`

--

## Cose da sistemare

-   Lo scopriremo solo in live...

---

# Il _"NUOVO Mental model"_

-   SCAM -> Optional NgModule -> **NO** NgModule ,
-   **standalone**,
-   DI con **inject**,
-   utility _provideRoute, provideHttp_ ...

--

## Extra: utilizzo _modern JS tools_

-   esbuild 🤯
-   vite 💚 ⚡️

---

## Q&A + REFERENCE

Le "mie" nuove Best Practices:

--

## FEEDBACK & CONTACT

![Me](https://www.xedotnet.org/media/1032/morosinotto_foto.jpg?height=300)

#### Daniele Morosinotto

**Javascript enthusiast**

-   Twitter [@dmorosinotto](https://twitter.com/dmorosinotto)
-   Email [d.morosinotto@icloud.com](d.morosinotto@icloud.com)
-   Repo [https://github.com/dmorosinotto/XE_Modernize_Angular](https://github.com/dmorosinotto/XE_Modernize_Angular)
