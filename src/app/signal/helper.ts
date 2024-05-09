import { Signal, untracked, WritableSignal } from "@angular/core";
import { SIGNAL, ReactiveNode, signalUpdateFn, SignalNode, signalSetFn } from "@angular/core/primitives/signals";
import { Observable } from "rxjs";

export function hackUpdate<T>(s: Signal<T>, updater: (x: T) => T) {
    const reactiveNode = s[SIGNAL] as ReactiveNode;
    //const prevAllow = reactiveNode.consumerAllowSignalWrites;
    const node = s[SIGNAL] as SignalNode<T>;
    console.dir(node);
    //reactiveNode.consumerAllowSignalWrites = true;
    signalUpdateFn(node, updater);
    //reactiveNode.consumerAllowSignalWrites = prevAllow;
}

export function hackMutate<T>(s: Signal<T>, mutateFn: (x: T) => T) {
    const node = s[SIGNAL] as SignalNode<T>;
    const old = node.value;
    signalSetFn(node, {} as T);
    if (typeof old === "object") {
        signalSetFn(node, (Array.isArray(old) ? [] : {}) as T);
    }
    signalSetFn(node, mutateFn(old));
}

export function mutate<T>(s: WritableSignal<T>, mutateFn: (x: T) => T | void) {
    untracked(() => {
        const old = s();
        if (typeof old === "object") {
            s.set((Array.isArray(old) ? [] : {}) as T);
        }
        const ret = mutateFn(old);
        s.set(ret === undefined ? old : ret);
    });
}

export const printEqual =
    (eq: string = "printEqual") =>
    (a: unknown, b: unknown): boolean => {
        console.info(eq, typeof a, a, "=?=", typeof b, b, "->", a === b);
        return Object.is(a, b);
    };

export function fakeAsync<T>(value: T, delay: number = 0): Promise<T> {
    return new Promise<T>((resolve) => setTimeout(() => resolve(value), delay));
}

export function fakeObs<T>(value: T, delay: number = 0): Observable<T[]> {
    return new Observable((observer) => {
        let arr = [] as T[];
        const timer = setInterval(() => observer.next((arr = [...arr, value])), delay);
        return () => {
            console.warn("Unsubscribing...");
            clearInterval(timer);
        };
    });
}
