import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationServiceService } from '../Services/registration-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  verifyNumber:any;
  msg: string;
  constructor(private http:HttpClient, private router:Router,private verify:RegistrationServiceService) { }

  ngOnInit() {
    
  }
  evaulateOTP(event) {
    /** check if we have digits and a valid OTP */
    const OTP = event.replace(/\s/g, '');
    const isotpComplete = /^\d{6}$/.test(OTP);

    if (isotpComplete === true) {
      const payload = {
        ConsumerRegistrationConfirmation: `True`,
        ConfirmationDetails: {
          otp: this.verifyNumber,
          MobileNumber : JSON.parse(localStorage.getItem('Phone_Number'))
        }
      };
      console.log('Payload sent for verification is::', payload);
      this.verify.verifyMobileNumber(payload).subscribe(data=>{
        console.log('The response is::',data);
        if (data['statusCode'] === 200) {
          this.msg="Registration Success";
          setTimeout (() => {
            console.log("Hello from setTimeout");
            this.router.navigate(['consumer-login']);
         }, 1000);
    
          
      }
      else{
        this.msg="Fail";
        //this.router.navigate(['consumer-login']);
      }
    });
   

  }
}
}
