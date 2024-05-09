import {
    ChangeDetectionStrategy,
    Component,
    input,
    model,
    effect,
    computed,
    untracked,
    signal,
    Signal,
    inject,
    Injector,
} from "@angular/core";
import { produce } from "immer";
import { fakeAsync, fakeObs } from "./helper";
import { toSignal } from "@angular/core/rxjs-interop";

export interface Data {
    name: string;
    number?: number;
}

@Component({
    selector: "app-child-signal",
    standalone: true,
    imports: [],
    template: `
        <p>
            signal child works! <i> {{ time().length }} </i>
            <b>{{ printData() }}</b>
            <u>{{ getter }}</u>
            {{ printFuture() }}
            <button (click)="(null)">DO NOTHING</button>
        </p>
        <button (click)="change(true)">Immutable IS OK!</button>
        <button (click)="change(false)">Mutable DON'T WORK</button>
        <button (click)="updateName()">Produce Name</button>
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildSignalComponent {
    name = input<string>(/*"Figlio"*/);
    data = model.required<Data>();
    constructor() {
        effect(() => {
            console.group(untracked(this.printName));
            console.log("model changed:", this.data());
            console.groupEnd();
        });
    }
    change(immutable: boolean) {
        if (immutable) {
            this.data.update((d) => ({ ...d, number: (d?.number ?? 0) + 1 }));
        } else {
            this.data.update((d) => {
                d.number = (d?.number ?? 0) + 1;
                return d;
            });
        }
        console.dir(this.data());
    }
    updateName() {
        this.data.update(
            produce((d) => {
                d.name = "produce " + d.name;
            })
        );
    }
    printData = computed(() => {
        console.group(untracked(this.printName));
        console.log("Computed printData");
        console.groupEnd();
        return `INTERNO ${this.data().name} # ${this.data().number ?? "N/A"}`;
    });
    printName = computed(() => {
        console.log("Computed printName");
        return "IN " + (this.name()?.toUpperCase() ?? "@street") + " ";
    });
    after = computed(() => 1000 * (this.data().number ?? 3));
    get getter() {
        console.group(untracked(this.printName));
        console.log("getter interno");
        console.groupEnd();
        return `(${this.data()?.number ?? "--"})`;
    }

    future = signal<Data | null>(null);
    laod = effect(
        async () => {
            const data = this.data();
            console.log("Loading...", data);
            this.future.set(null); //SCRITTURA SINCRONA RICHIEDE allowSignalWrites
            const res = await fakeAsync(data, this.after());
            console.log("Loaded:", res);
            this.future.set(res); //SCRITTURA ASYNCRONA FUNZIONA ^_^
            //ATTENZIONE AI CICLI INFINITI...
            //this.data.update(produce((d) => { d.name += "..." + after; }) );
        },
        { allowSignalWrites: true }
    );
    printFuture = computed(() => {
        console.log("Computed printFuture");
        const ret = this.future();
        if (!ret) return "STILL WAITING...";
        return `FUTURE RETURN ${ret.name} after ${this.after()} millisec`;
    });
    time!: Signal<Data[]>;
    injector = inject(Injector);
    ngOnInit() {
        this.time = toSignal(fakeObs(this.data(), 1000), { initialValue: [], injector: this.injector });
    }
}
