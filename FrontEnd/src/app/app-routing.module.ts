import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConsumerLoginComponent } from './consumer-login/consumer-login.component';
import { COnsumerRegistrationComponent } from './consumer-registration/consumer-registration.component';
import { VerifyComponent } from './verify/verify.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'consumer-login', component: ConsumerLoginComponent },
  { path: 'consumer-registration', component: COnsumerRegistrationComponent },
  { path: 'consumer-verify', component: VerifyComponent },
  { path:'home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
