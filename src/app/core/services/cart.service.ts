import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient);

  myHeaders : any = {token : localStorage.getItem('userToken')}
  constructor() { }

  addProductToCart(id: string) : Observable<any>{
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`
        , {
          "productId": id
        }
        ,{
          headers: this.myHeaders
        }
      )
  }


  getUserCart() : Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`
      ,{
          headers: this.myHeaders
        }
      )
  }

  removeProductFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}` , {
      headers: this.myHeaders,
    });
  }

  updateProductQuantity(id :string , quantity :number) : Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {"count":quantity},
      {headers: this.myHeaders}
    )
  }

  clearCart(): Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart` , {headers:this.myHeaders})
  }

}
