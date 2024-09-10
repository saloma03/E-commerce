import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
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

  verifyUserEmail(userData : object) : Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , userData);
  }

  verifyRestCode(userData : object) : Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , userData);
  }
  resetPassword(userData : object) : Observable<any>
  {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , userData)
    // return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , userData);
  }

  saveUserData(): any {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('userToken') !== null) {
        this.userData = jwtDecode(localStorage.getItem("userToken")!);
        return this.userData;
      }
    }
  }


}
