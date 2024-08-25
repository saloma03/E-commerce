import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  constructor() { }


  // addToWishList(id:string):Observable<any>{
  //   return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
  //     id
  //     ,{
  //     Headers: {
  //       Token: localStorage.getItem('userToken'),
  //     }
  //   })
  // }
  // deleteFromWishList():Observable<any>{
  //   return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
  //     Headers: {
  //       Token: localStorage.getItem('userToken'),
  //     }
  //   })
  // }

}
