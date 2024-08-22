import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _HttpClient = inject(HttpClient);
  userData:any = null;

  constructor() { }
  setRegisterForm(userData : object) : Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup` , userData);
  }
  setLoginForm(userData : object) : Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , userData);
  }

  saveUserData():void
  {
    if(      localStorage.getItem('userToken') !== null
    ){

      this.userData = jwtDecode(localStorage.getItem("userToken")!)
    }
  }

}
