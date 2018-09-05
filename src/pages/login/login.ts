import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController} from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
// import { AddEventPage } from '../add-event/add-event';
 
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GlobalsProvider } from '../../providers/globals/globals';
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
  error:any;
  user: {email?:string,password?:string}={};

  segment: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder,
              public modalCtrl:ModalController,public fireData:FirebaseProvider,public globals:GlobalsProvider,
              public alertCtrl:AlertController) {
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
    this.fireData.loginUser(this.loginForm.value.email,this.loginForm.value.password).then((data:any)=>{
      console.log(data);
      this.globals.userId=data.user.uid;
      this.globals.userEmail=data.user.email;
      console.log("user id=",this.globals.userId);
      this.createLoginAlert();
    }).catch((err)=>{
      console.log(err);
      this.error = err.message;
      console.log("message",this.error);
      this.createFailureAlert();
    })
  }

  createLoginAlert()
  {
    let alert = this.alertCtrl.create({
      title:'Sucess!',
      message:'You are logged in',
      buttons:[
        {
          text:'Ok',
          handler:()=>{
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

  createFailureAlert()
  {
    let alert = this.alertCtrl.create({
      title: 'Failure!',
      message: this.error,
      buttons:[
        {
          text:'Ok',
          role:'cancel',
        }
      ]
    });
    alert.present();
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
