import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GlobalsProvider } from '../../providers/globals/globals';

import { LoginPage } from '../../pages/login/login';
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
  error: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder,
              public fireData:FirebaseProvider, public globals:GlobalsProvider,public alertCtrl:AlertController,
              public loadingCtrl:LoadingController) {
                
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
    let loader =this.loadingCtrl.create({
      dismissOnPageChange:true,
      content:'Sending a Reset link to your email'
    });
    loader.present();
    this.fireData.resetPassword(this.resetPasswordForm.value.email).then((data)=>{
      console.log(data);
      loader.dismiss();
      this.createSuccessfullAlert();
      this.navCtrl.setRoot(LoginPage);
    }).catch((err)=>{
      console.log(err);
      loader.dismiss();
      this.error=err.message;
      this.createFaliureAlert();
    })
  }

  createSuccessfullAlert()
  {
    let alert = this.alertCtrl.create({
      title:'Sucess!',
      subTitle:'Reset Email has been send',
      message:'Please check your email for the link',
      buttons:[
        {
          text:"OK",
          role:'cancel',
        }
      ]
    }) ;
    alert.present();
  } 

  createFaliureAlert()
  {
    let alert = this.alertCtrl.create({
      title:'Failure!',
      subTitle:'Error Occured',
      message:this.error,
      buttons:[
        {
          text:'Ok',
          role:'cancel',
        }
      ]
    }) ;
    alert.present();
  } 

}
