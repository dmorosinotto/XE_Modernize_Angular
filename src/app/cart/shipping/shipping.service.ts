import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IShipping {
  type: string;
  price: number;
}

@Injectable()
export class ShippingService {
  constructor(private http: HttpClient) {}

  getShippingPrices(): Observable<IShipping[]> {
    return this.http.get<IShipping[]>('/assets/shipping.json');
  }

  
}
