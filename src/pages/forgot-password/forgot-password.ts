import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GlobalsProvider } from '../../providers/globals/globals';
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  public resetPasswordForm;
  user: {email?:string } ={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder,
              public fireData:FirebaseProvider, public globals:GlobalsProvider) {
                
                this.initializeresetPasswordForm()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  initializeresetPasswordForm()
  {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required])],
    })
  }

  clickOnClose()
  {
    this.navCtrl.pop();
  }

  clickOnSubmit()
  {
    console.log("Clicked on submit");
  }

}
