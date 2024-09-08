import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Iproduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  ProductFavList: WritableSignal<Iproduct[]> = signal([]);

  private readonly _HttpClient = inject(HttpClient);
  constructor() { }

  numOfFav:WritableSignal<number> = signal(0);

  addToWishList(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {"productId" : id}
     )
  }
  getUserWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist` )
  }
  deleteFromWishList(id : string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }

}
