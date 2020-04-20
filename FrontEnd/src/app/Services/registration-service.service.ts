import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  constructor(private http:HttpClient) { }

  requestOptions: any = { headers: new HttpHeaders() };

  //Note: These API End points need to be configured according to the AWS Console Settings
  
  registerUser(payload){

    this.requestOptions.headers.append('Access-Control-Allow-Origin', '*');
    this.requestOptions.headers.append('Access-Control-Allow-Credentials', true);


    console.log("HTTP REQUEST FOR REGISTERING NEW USER:: ", environment.apiBaseUrl + '/ProducerRegistration');
    console.log("-> REQUEST BODY :: ", payload);
    return this.http.post(environment.apiBaseUrl + '/MobileRegistration', payload,
    this.requestOptions);
  }



  registerMobileNumber(payload){
   return this.http.post(environment.apiBaseUrl + '/MobileRegistration', payload);
  }


  verifyMobileNumber(payload){
    return this.http.post(environment.apiBaseUrl +'/MobileRegistration',payload);
  }
  }

