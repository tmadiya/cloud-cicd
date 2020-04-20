import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistrationServiceService } from '../Services/registration-service.service';
import { CustomValidators } from '../Services/CustomValidators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationSucess: string;
  dSelect: string;
  registration: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  IDPattern = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))((\d{4}))[0/1]((\d{2}))$/;
  CipcPattern = '(^[0-9]{4,4}/[0-9]{6,6}/[0-9]{2,2}$)|(^[a-zA-Z]{1}[0-9]{10,10})';
  confirmpassword: string;
  postResult: any;
  PrivacyTnCAccepted=false;
  msg: string;

  


  constructor(private eleRef:ElementRef,private fb: FormBuilder, private http: HttpClient, private router: Router, private RegisterService: RegistrationServiceService) { }

  ngOnInit() {
    this.registration = this.fb.group({
      CompanyName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      // IdNumber: ['', [Validators.required, Validators.pattern(this.IDPattern)]],
      CipcRegistered: ['No'],
      CipcNumber: ['', Validators.pattern(this.CipcPattern)],
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


  onSubmit() {
    var payload = {
      "ProducerRegistration": "True",
      "ProducerRegistrationDetails": {
        "Acceptance": "True",
        "FirstName": "Vishnu",
        "LastName": "Ranganathan",
        "Email": " viranganathan @deloitte.com",
        "Password": "Test@12345",
        "CompanyName": "Tzero-company",
        "CipcRegistered": "Yes",
        "CipcNumber": "1234567",
        "IdNumber": "123456"
      }
    }
    payload.ProducerRegistrationDetails.CompanyName = this.registration.value.CompanyName;
    //payload.ProducerRegistrationDetails.Acceptance = this.registration.value.Acceptance.toString();
    payload.ProducerRegistrationDetails.FirstName = this.registration.value.FirstName;
    payload.ProducerRegistrationDetails.LastName = this.registration.value.LastName;
    payload.ProducerRegistrationDetails.Email = this.registration.value.Email;
    payload.ProducerRegistrationDetails.Password = this.registration.value.Password;
    payload.ProducerRegistrationDetails.CipcRegistered = this.registration.value.CipcRegistered;
    payload.ProducerRegistrationDetails.CipcNumber = this.registration.value.CipcNumber;
    payload.ProducerRegistrationDetails.IdNumber = this.registration.value.IdNumber;

    console.log('This is the payload being sent for Registration::', payload )
    this.RegisterService.registerUser(payload).subscribe(
      res => {
        console.log("--> REQUEST RESPONSE FOR REGISTRATION OF NEW USER:: ", res);
        this.postResult = res;
        if (this.postResult.statusCode === 200) {
          // this.router.navigate(['/almostdone']);
          console.log('REGISTRATION SUCCESS');
          this.msg="SUCCESS";
          this.router.navigate(['home']);
        }
        if (this.postResult.statusCode === 400 && this.postResult.message === 'Registration Failed') {
          this.registrationSucess = 'The User is not allowed for registration on the platform. Kindly contact support';
        }
        else if (this.postResult.statusCode === 400 && this.postResult.message === 'This User has already been registered on the platform') {
          this.registrationSucess = this.postResult.message;
        }
      });
  }
  setCipcRegistered(value) {
    this.dSelect = value;
    if (this.dSelect === '2') {
      this.registration.controls['CipcNumber'].reset();
    }
  }
  /** For Getting Form Controls */
  get f() {
    return this.registration.controls;
  }
  firelogin() {
    console.log('ACCOUNT EXISTS ALREADY< REDIRECTING TO LOGIN');
  }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }

}
