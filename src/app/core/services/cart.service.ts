import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient);

  constructor() { }

  addProductToCart(id: string) : Observable<any>{
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`
        , {
          "productId": id
        }

      )
  }


  getUserCart() : Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`

      )
  }

  removeProductFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`

    );
  }

  updateProductQuantity(id :string , quantity :number) : Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {"count":quantity}
    )
  }

  clearCart(): Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart` )
  }

}
