import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPoliciesPage } from '../pages/privacy-policies/privacy-policies';
import { ContentPoliciesPage } from '../pages/content-policies/content-policies';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AddEventPage } from '../pages/add-event/add-event';


import { FirebaseProvider } from '../providers/firebase/firebase';
import { GlobalsProvider } from '../providers/globals/globals';

import { SMS } from '@ionic-native/sms';

import { NgDatepickerModule } from 'ng2-datepicker';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    TermsOfServicePage,
    PrivacyPoliciesPage,
    ContentPoliciesPage,
    ForgotPasswordPage,
    AddEventPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    TermsOfServicePage,
    PrivacyPoliciesPage,
    ContentPoliciesPage,
    ForgotPasswordPage, 
    AddEventPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    GlobalsProvider,
    SMS,
    NgDatepickerModule,
    AngularDateTimePickerModule,
  ]
})
export class AppModule {}
