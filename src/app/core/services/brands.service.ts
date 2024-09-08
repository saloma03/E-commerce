import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _HttpClient = inject(HttpClient);
  constructor() { }

  getBrands () :Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }

}
