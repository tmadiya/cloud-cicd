import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router){}
  title = 'Login Registration Accelerator Using AWS Services & Angular Deployed USing CICD Tuesday Demo v1.0.2';
  movetoRegistration(){
    this.router.navigate(['registration']);
  }
  movetoLogin(){
    this.router.navigate(['login']);
  }

  movetoConsumerRegistration(){
    this.router.navigate(['consumer-registration']);
  }

  movetoConsumerLogin(){
    this.router.navigate(['consumer-login']);
  }

  /// USAGE NOTES:: PLEASE MAKE SURE THAT THE ENVIRONMENT VARIABLES HAVE BEEN PROPERLY DEFINED
  // AND THE AWS ACCOUNT IS PROPERLY CONFIGURED
}
