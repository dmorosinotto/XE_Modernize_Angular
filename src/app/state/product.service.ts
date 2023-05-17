import {
	InjectionToken,
	Injectable,
	Inject,
	Type,
	inject,
	makeEnvironmentProviders,
	EnvironmentProviders
} from "@angular/core";

export interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
}

const FAKE_PRODUCTS: Product[] = [
	{
		id: 16,
		name: "NG 16",
		price: 0.01,
		description: "Lastest and gratest with Signal preview"
	},
	{
		id: 15,
		name: "NG 15",
		price: 2.9,
		description: "Stable standalone + provide API"
	},
	{
		id: 14,
		name: "NG 14",
		price: 3.0,
		description: "Introducing standalone + inject"
	},
	{
		id: 13,
		name: "NG 9-13",
		price: 2.7,
		description: ""
	}
];

export type InferFrom<T> = T extends InjectionToken<infer I> ? I : T;
export const PRICE_LIMIT = new InjectionToken<number>(
	"PRICE_LIMIT"
	/*, { providedIn: "root", factory: () => 700 }*/
);

@Injectable(/*{ providedIn: "root" }*/)
export class ProductService {
	public LIMIT = inject(PRICE_LIMIT);

	public getAll() {
		return FAKE_PRODUCTS;
	}
}

export const provideProductService = (limit: number) =>
	makeEnvironmentProviders([
		{ provide: PRICE_LIMIT, useValue: limit },
		ProductService //{ provide: ProductService, useClass: ProductService }
	]);
