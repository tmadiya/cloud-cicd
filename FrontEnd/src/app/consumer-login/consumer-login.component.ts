import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from '../Services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer-login',
  templateUrl: './consumer-login.component.html',
  styleUrls: ['./consumer-login.component.css']
})
export class ConsumerLoginComponent implements OnInit {
  login: FormGroup;
  msg: any;
  message: any;

  constructor(private fb:FormBuilder,private loginConsumer:LoginServiceService,private router:Router) { }

  ngOnInit() {

    //Using Formbuilder, add as many Validations as required.
    
    this.login = this.fb.group({
      PhoneNumber: ['', [Validators.required]],
      Password: ['', Validators.required],
      Remember_Me: ['']
    });

    if (localStorage.getItem('Phone_Number') !== null) {
      this.login.controls.PhoneNumber.setValue(JSON.parse(localStorage.getItem('Phone_Number')));
      this.login.controls.Password.setValue(localStorage.getItem('Password'));
      this.login.controls.Remember_Me.setValue(localStorage.getItem('Remember_Me'));
    }
  }

  get f() {
    return this.login.controls;
  }

  onSubmit(){
    localStorage.setItem('Phone_Number',JSON.stringify(this.login.value['PhoneNumber']));
    //.. SO that it can be used throughout the application.

    const payload = {
      ConsumerLogin: 'True',
      ConsumerLoginDetails: {
        UserName: JSON.parse(localStorage.getItem('Phone_Number')),
        Password: this.login.value['Password'],
      }
    };
  console.log('The payload being sent is::',payload);
  this.loginConsumer.ConsumerLogin(payload).subscribe(data=>{
    console.log('Data is::', data);
    if(data['statusCode']==200){
      this.msg='SUCCESS';
      this.router.navigate(['home']);
    }else{
      this.msg='FAIL';
      this.message=data['message'];
    }
  });
  }
}
