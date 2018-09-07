import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, AlertController} from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
// import { AddEventPage } from '../add-event/add-event';
 
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GlobalsProvider } from '../../providers/globals/globals';

import {SMS} from '@ionic-native/sms';
import { EmailValidator } from '../../validators/email';


import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPoliciesPage } from '../privacy-policies/privacy-policies';
import { ContentPoliciesPage } from '../content-policies/content-policies';
import { anchorDef } from '@angular/core/src/view';
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

  User:{ name?:any, email?:any, phonenumber?:any, password?:any, checkcondition?:any } ={};
  public signupForm;
  returnInvalid: boolean = false;
  checkedBoolean: boolean = false;
  OTPGenerated:number;
  OTPEntered:number;
  errormessage: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder,
              public modalCtrl:ModalController,public fireData:FirebaseProvider,public globals:GlobalsProvider,
              public alertCtrl:AlertController,private sms:SMS) {
    
    this.segment="signIn"
    this.initializeLoginForm();
    this.initializeForm();
    this.User.checkcondition=false;
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
  


  initializeForm() {
		this.signupForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['',Validators.compose([Validators.required])],
      phonenumber: ['',Validators.compose([Validators.required])],
      checkcondition:['',Validators.compose([Validators.required])],
		});
  }
  
  clearErrors() {
		if (this.user.email == "" || this.user.password == "") {
			this.returnInvalid = false;
		}
  }
  
   RegisterUser()
  {
    var options:{
      replaceLineBreaks:true,
      android:{
        intent:''
      }
    }
    console.log("Clicked on Submit");
    console.log(this.signupForm.value);
    // console.log( Math.floor(100000 + Math.random() * 900000) );
    this.OTPGenerated = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP=",this.OTPGenerated);
    console.log(typeof(this.OTPGenerated));
    console.log(typeof(String(this.OTPGenerated)));
    this.createAlert(); //remove this afterwards
    this.sms.send(String(this.signupForm.value.phonenumber),String(this.OTPGenerated),options).then((result)=>{
      console.log('send');
      console.log(result);
      this.createAlert();
    }).catch((err)=>{
      console.log(err);
      alert(JSON.stringify(err));
    })
  }

  createAlert()
  {
    let alert=this.alertCtrl.create({
      title:'Enter OTP',
      inputs:[
        {
          name:'OTPEntered',
          placeholder:'******',
          type:'number'
        }
      ],
      buttons:[
        {
          text:'Submit',
          handler:(data)=>{
            console.log("In handler");
            console.log(JSON.stringify(data));
            this.OTPEntered=data.OTPEntered;
            console.log("OTPEntered=",this.OTPEntered);
            console.log("OTPGenerated=",this.OTPGenerated);
            if(this.OTPEntered==this.OTPGenerated)
            {
              console.log("Correct");
              this.createUser();
            }
            else
            {
              console.log("Incorrect");
              this.createNotSuccessfulAlert();
            }
          }
        }
      ]
    });
    alert.present();
  }

  checkboxClicked()
  {
    if(this.User.checkcondition==true)
    {
      this.checkedBoolean=true;
    }
    else
    {
      this.checkedBoolean=false;
    }
    console.log(this.checkedBoolean);
  }

  createUser()
  {
    this.fireData.signupUser(this.signupForm.value.email,this.signupForm.value.password,
      this.signupForm.value.name,this.signupForm.value.phonenumber).then((data)=>{
        console.log(data);
        this.createSuccessfulAlert();
        
    })
  }

  createSuccessfulAlert()
  {
    let alert=this.alertCtrl.create({
      title:'Success!',
      message:'User is created Successfully',
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

  createNotSuccessfulAlert()
  {
    let alert=this.alertCtrl.create({
      title:'Failure!',
      message:'Entered OTP is wrong',
      buttons:[
        {
          text:'Ok',
          handler:()=>{
            
          }
        }
      ]
    });
    alert.present();
  }

  tapOnPrivacyPolicies()
  {
    console.log('tapped on privacy policies');
    var modal=this.modalCtrl.create(PrivacyPoliciesPage);
    modal.present();
  }

  tapOnTermsOfService()
  {
    console.log('tapped on terms of service');
    var modal= this.modalCtrl.create(TermsOfServicePage);
    modal.present();
  }

  tapOnContentPolicies()
  {
    console.log('tapped on Content Policies');
    var modal=this.modalCtrl.create(ContentPoliciesPage);
    modal.present();
  }

}
