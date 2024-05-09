import { ChangeDetectionStrategy, Component, signal, computed, Signal, untracked, WritableSignal, effect } from "@angular/core";
import { produce, setAutoFreeze } from "immer";
import { hackUpdate, hackMutate, mutate, printEqual, fakeAsync, fakeObs } from "./helper";
import { ChildSignalComponent, Data } from "./child.component";
import { JsonPipe } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";

setAutoFreeze(false); //QUESTO ANDREBBE FATTO SU main.ts E SERVE PER EVITARE PROBLEMI DI produce CHE TRAFORMA PROP READONLY

interface Address {
    street: {
        name: string;
        number?: number;
    };
    city: string;
}

function addressEqualNumber(a: Address, b: Address): boolean {
    console.group("addressEqualNumber");
    console.warn(a.street?.number === b.street?.number);
    console.log("^ a=?=b", a, b);
    console.groupEnd();
    return a.street?.number === b.street?.number;
}

@Component({
    selector: "app-signal",
    standalone: true,
    imports: [ChildSignalComponent, JsonPipe],
    template: `
        <p>
            <i>{{ printAddress() }}</i>
            signal works!
            <b>{{ printCivico() }}</b>
            <u>{{ civico }}</u>
            <button (click)="(null)">DO NOTHING</button>
            <button (click)="hack()">HACK</button>
        </p>
        <button (click)="transfer()">Transfer</button>
        <button (click)="transfer(true)">Same</button>
        <button (click)="move(true)">Move Immutable IS OK!</button>
        <button (click)="move(false)">Move Mutable DON'T WORK</button>
        <button (click)="produce()">Produce Nr</button>
        <button (click)="produce2()">Produce City</button>
        <button (click)="produce3()">Produce Via</button>
        <button (click)="mutateNumber()">Trick: mutateNumber</button>
        <button (click)="mutateCity()">Trick: mutateCity</button>
        <button (click)="mutateVia()">Trick: mutateVia</button>
        <hr />
        <app-child-signal [data]="streetDONTWORK()" (dataChange)="mutateStreet($event)"></app-child-signal>
        <hr />
        <pre>{{ padre() | json }}</pre>
        {{ printPadre() }}
        @if(5 > (padre().number ?? 0) ) {
        <app-child-signal [(data)]="padre" name="figlio"></app-child-signal>
        }
    `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignalComponent {
    address = signal<Address>(
        { street: { name: "Via Roma", number: 12 }, city: "Milano" },
        { equal: printEqual("eq Address") }
        // { equal: addressEqualNumber }
    );
    printAddress = computed(() => {
        console.log("Computed printAddress");
        return `${this.printVia()} - ${this.address().city}`;
    });
    streetDONTWORK = computed(
        () => {
            console.error("Computed street DONTWORK!");
            return this.address().street;
        },
        { equal: printEqual("eq Street") }
    );
    printVia = computed(
        () => {
            console.warn("Computed printVia");
            return `${this.address().street.name} ${this.printCivico()}`;
            // return `${this.streetDONTWORK().name} ${this.printCivico()}`;
        },
        { equal: printEqual("eq Via") }
    );
    numero = computed(
        () => {
            console.log("Computed numero");
            return this.address().street?.number ?? "SN";
            // return this.streetDONTWORK()?.number ?? "SN";
        },
        { equal: printEqual("eq numero") }
    );
    printCivico = computed(
        () => {
            console.warn("Computed printCivico");
            var n = this.numero();
            if (typeof n === "string") return n;
            else return ", n." + n;
        },
        { equal: printEqual("eq Ncivico") }
    );
    get civico() {
        console.log("get civico");
        return "N. " + (this.address().street?.number ?? "SN");
    }
    transfer(sameNumber: boolean = false) {
        if (sameNumber) this.address.set({ street: { name: "Via Garibaldi", number: this.address().street.number }, city: "Milano" });
        else this.address.set({ street: { name: "Via Garibaldi", number: 10 }, city: "Milano" });
    }
    move(immutable: boolean) {
        if (immutable)
            this.address.update((addr) => {
                return { ...addr, street: { ...addr.street, number: (addr.street.number ?? 0) + 10 } };
            });
        else {
            this.address.update((addr) => {
                addr.street.number = (addr.street.number ?? 0) + 10;
                return addr;
            });
        }
        console.dir(this.address());
    }
    hack() {
        hackUpdate(this.numero, (x) => Number(x) + 123);
    }
    produce() {
        console.clear();
        console.log("Produce Number");
        this.address.update(
            produce((addr) => {
                addr.street.number = (addr.street.number ?? 0) + 10;
            })
        );
    }
    produce2() {
        console.clear();
        console.log("Produce City");
        this.address.update(
            produce((addr) => {
                addr.city = "Torino";
            })
        );
    }
    produce3() {
        console.clear();
        console.log("Produce Via");
        this.address.update(
            produce((addr) => {
                addr.street.name = "Piazza Duomo";
            })
        );
    }
    mutateNumber() {
        console.clear();
        console.log("Trick - mutateNumber");
        // var addr = untracked(this.address);
        // this.address.set({} as Address);
        // addr.number = (addr.number ?? 0) + 10;
        // this.address.set(addr);
        mutate(this.address, (addr) => {
            addr.street.number = (addr.street.number ?? 0) + 10;
        });
    }
    mutateCity() {
        console.clear();
        console.log("Trick2 - mutateCity");
        // var addr = untracked(this.address);
        // this.address.set({} as Address);
        // addr.city = "Venezia";
        // this.address.set(addr);
        mutate(this.address, (addr) => {
            addr.city = "Venezia";
        });
    }
    mutateVia() {
        console.clear();
        console.log("Trick3 - mutateVia");
        // var addr = untracked(this.address);
        // this.address.set({} as Address);
        // addr.city = "Venezia";
        // this.address.set(addr);
        mutate(this.address, (addr) => {
            addr.street.name = "Dante";
        });
    }
    mutateStreet(street: Data) {
        console.clear();
        console.log("FUNZIA? - mutateStreet");
        // var addr = untracked(this.address);
        // this.address.set({} as Address);
        // addr.city = "Venezia";
        // this.address.set(addr);
        mutate(this.address, (addr) => {
            addr.street = street;
        });
    }
    padre = signal<Data>({ name: "Padre" });
    constructor() {
        effect(() => {
            console.log("padre changed:", this.padre());
        });
    }
    printPadre = computed(() => {
        console.log("Computed printPadre");
        return `PADRE ${this.padre().name} # ${this.padre().number ?? "N/A"}`;
    });
}
