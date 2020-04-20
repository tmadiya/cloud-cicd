import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginServiceService } from './Services/login-service.service';
import { RegistrationServiceService } from './Services/registration-service.service';
import { HomeComponent } from './home/home.component';
import { COnsumerRegistrationComponent } from './consumer-registration/consumer-registration.component';
import { ConsumerLoginComponent } from './consumer-login/consumer-login.component';
import { VerifyComponent } from './verify/verify.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    COnsumerRegistrationComponent,
    ConsumerLoginComponent,
    VerifyComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
