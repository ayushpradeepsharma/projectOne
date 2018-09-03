import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPoliciesPage } from '../privacy-policies/privacy-policies';
import { ContentPoliciesPage } from '../content-policies/content-policies';

import {SMS} from '@ionic-native/sms';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user:{ name?:any, email?:any, phonenumber?:any, password?:any, checkcondition?:any } ={};
  public loginForm;
  returnInvalid: boolean = false;
  checkedBoolean: boolean = false;
  OTPGenerated:number;
  OTPEntered:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
              public modalCtrl:ModalController,private sms:SMS, public alertCtrl:AlertController) {
    this.initializeForm();
    this.user.checkcondition=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  initializeForm() {
		this.loginForm = this.formBuilder.group({
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
  
  async RegisterUser()
  {
    console.log("Clicked on Submit");
    console.log(this.loginForm.value);
    // console.log( Math.floor(100000 + Math.random() * 900000) );
    this.OTPGenerated = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP=",this.OTPGenerated);
    this.createAlert(); //remove this afterwards
    this.sms.send(String(this.loginForm.value.phonenumber),'ayush').then((result)=>{
      console.log('send');
      this.createAlert();
    }).catch((err)=>{
      console.log(err);
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
            }
            else
            {
              console.log("Incorrect");
            }
          }
        }
      ]
    });
    alert.present();
  }

  checkboxClicked()
  {
    if(this.user.checkcondition==true)
    {
      this.checkedBoolean=true;
    }
    else
    {
      this.checkedBoolean=false;
    }
    console.log(this.checkedBoolean);
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
