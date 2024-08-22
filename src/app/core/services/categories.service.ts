import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _HttpClient = inject (HttpClient)
  constructor() { }
  getCategories():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
}
