import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../Services/CustomValidators';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from '../registration/registration.component';
import { RegistrationServiceService } from '../Services/registration-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer-registration',
  templateUrl: './consumer-registration.component.html',
  styleUrls: ['./consumer-registration.component.css']
})
export class COnsumerRegistrationComponent implements OnInit {
  msg: string;

  constructor(private fb: FormBuilder,private ConsumerRegister:RegistrationServiceService,private router:Router) { }

  registration: FormGroup;

  ngOnInit() {
    this.registration = this.fb.group({
      PhoneNumber: ['', Validators.required],
     
      Password: [null, Validators.compose([
        Validators.required,
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        // check whether the entered password has a lower case letter
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true
        }),
        // check whether the entered password has a special character
        CustomValidators.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        ),
        Validators.minLength(8)
      ])
      ],
      //Acceptance: ['', Validators.requiredTrue],
      ConfirmPassword: ['', Validators.required]
    },
      {
        validator: MustMatch('Password', 'ConfirmPassword')
      });
  }


  get f() {
    return this.registration.controls;
  }

  onSubmit(){
    localStorage.setItem('Phone_Number', JSON.stringify(this.registration.value['PhoneNumber']));
    //The Phone number can be referenced from anywhere in the application
    const payload = {
      ConsumerRegistration: `True`,
      ConsumerRegistrationDetails: {
        MobileNumber: JSON.parse(localStorage.getItem('Phone_Number')),
        Password: this.registration.value['Password'],
        confirmPassword: this.registration.value['ConfirmPassword'],
      }
    }

    //DESIGN PAYLOAD ACCORDING TO AWS SETTINGS AND API ENDPOINTS


    console.log('The payload being sent is::',payload);

    this.ConsumerRegister.registerMobileNumber(payload).subscribe(data=>{
      console.log('Data is::', data);
      if(data['statusCode']==200){
        console.log('Registration Success');
        this.msg="SUCESS";
        setTimeout (() => {
          console.log("Hello from setTimeout");
          this.router.navigate(['consumer-verify']);
       }, 1000);
  
      }
      else if(data['statusCode']==400){
        this.msg="Registration Failure";
        //this.router.navigate(['consumer-verify']);
      }
    })
  }

}
