import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginServiceService } from '../Services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  // tslint:disable-next-line: variable-name
  Email_Address: string;
  Password: string;
  // tslint:disable-next-line: variable-name
  Remember_Me: boolean;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  postResult: any;
  loginFail: string;
  routing:any;
  jwtToken:any;
  refreshToken:any;
  loginSuccess: boolean;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,private LogServe:LoginServiceService) { }

  ngOnInit() {
   
    // var url= window.location.search.slice(1).split('?');
    // this.routing=url.splice(0, 1).toString().split('=')[1];
    //console.log('This is routing::', this.routing);
    //console.log('THE ENVIRONMENT VARIABLE URL IS ::::', environment.apiBaseUrl);
    this.login = this.fb.group({
      Email_Address: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      Password: ['', Validators.required],
      Remember_Me: ['']
    });

    if (localStorage.getItem('Email') !== null) {
      this.login.controls.Email_Address.setValue(localStorage.getItem('Email'));
      this.login.controls.Password.setValue(localStorage.getItem('Password'));
      this.login.controls.Remember_Me.setValue(localStorage.getItem('Remember_Me'));
    }
  }

  onSubmit() {
    if (this.login.value.Remember_Me === true) {
      localStorage.setItem('Email', this.login.value.Email_Address);
      localStorage.setItem('Password', this.login.value.Password);
      // localStorage.setItem('cognitoID', //something from the response)
      localStorage.setItem('Remember_Me', 'true');
    
    } else {
     
      localStorage.setItem('Remember_Me', '');
      localStorage.setItem('Email', '');
      localStorage.setItem('Password', '');
      
    var payload =
    {
      "ProducerLogin":"True",
      "ProducerLoginDetails":{
        "email":"",
        "password":"",
      }
    }

    payload.ProducerLoginDetails.email = this.login.value.Email_Address;
    payload.ProducerLoginDetails.password = this.login.value.Password;
    
    console.log('HTTP LOGIN PAYLOAD', payload);

  
    this.LogServe.Login(payload).subscribe(res => {
          this.postResult = res;
          if (this.postResult.statusCode === 200) {
            //console.log('Sucess');
            var jwt_decode = require('jwt-decode');
            localStorage.setItem('isUserLoggedin', 'true');
            var token = this.postResult.body.idToken.jwtToken;
            var decodedJwt = jwt_decode(token);
            this.jwtToken = this.postResult.body.accessToken.jwtToken;
            this.refreshToken = this.postResult.body.refreshToken.token;
            localStorage.setItem('jwt', decodedJwt.name);
            localStorage.setItem('cognito_id', decodedJwt[`cognito:username`]);
            localStorage.setItem('jwt_email',decodedJwt.email);
            //console.log(localStorage.getItem('jwt_email'));
            localStorage.setItem('login','yes');
            if(localStorage.getItem('login')==='yes'){
              localStorage.setItem('isloggedin', 'true');
              //console.log(localStorage.setItem('isloggedin', 'true'))
              this.router.navigate(['/home']);
              this.loginSuccess=true;
          }
          else{
            this.router.navigate(['/login']);
          }
          }
          if (this.postResult.statusCode === 400) {
            this.loginFail = 'Oops! Your email and password do not match. Please try again';
          }
        });
  }
}
get f() {
  return this.login.controls;
}
}