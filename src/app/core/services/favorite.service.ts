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
  constructor() { }

  myHeader : any = { token :localStorage.getItem('userToken') };

  addToWishList(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {"productId" : id}
      ,{
        headers: this.myHeader

    })
  }
  getUserWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist` , {headers : this.myHeader})
  }
  deleteFromWishList(id : string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,{
      headers: this.myHeader
  })
  }

}
