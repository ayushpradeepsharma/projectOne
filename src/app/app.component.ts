import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = RegisterPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.initializeFirebaseApp();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  

  initializeFirebaseApp()
  {
    var config = {
      apiKey: "AIzaSyAd2tV5u5qLsOlb8wHHqFprJsjN14rviN4",
      authDomain: "chatapp-cfb34.firebaseapp.com",
      databaseURL: "https://chatapp-cfb34.firebaseio.com",
      projectId: "chatapp-cfb34",
      storageBucket: "chatapp-cfb34.appspot.com",
      messagingSenderId: "911078078805"
    };
    firebase.initializeApp(config);
  }
}

