import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  Login(payload){
   return this.http.post(environment.apiBaseUrl + '/MobileRegistration', payload)
  }

  ConsumerLogin(payload){
    return this.http.post(environment.apiBaseUrl + "/MobileLogin", payload);
  }
}
