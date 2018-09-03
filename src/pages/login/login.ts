import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm;
  user: {email?:string,password?:string}={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder,
              public modalCtrl:ModalController) {
    this.initializeLoginForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  initializeLoginForm()
  {
    this.loginForm= this.formBuilder.group({
      email:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],
    })
  }

  clickOnLogin()
  {
    console.log("cliked on login");
  }

  clickOnForgotPassword()
  {
    console.log("clicked on forgot password");
    let modal=this.modalCtrl.create(ForgotPasswordPage);
    modal.present();
  }

  clickOnCreateUser()
  {
    console.log("clicked on create a user");
    this.navCtrl.setRoot(RegisterPage);
  }

}
