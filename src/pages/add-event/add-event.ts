import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder , Validators } from '@angular/forms';

// import { DatepickerOptions } from 'ng2-datepicker';
// import * as frLocale from 'date-fns/locale/fr';
import { FirebaseProvider }  from '../../providers/firebase/firebase';
import { GlobalsProvider } from '../../providers/globals/globals';
/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  public addEventForm;
  event : { title?:string , description?:string , location?:string , eventDate?:any, eventTime?:any, type?:any, crowd?:any, count?:any, duration?:any; } ={};
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,
              public globals:GlobalsProvider, public fireData:FirebaseProvider) {
    this.initilizeaddEventForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }


  initilizeaddEventForm()
  {
    this.addEventForm = this.formBuilder.group({
      title: ['',Validators.compose([Validators.maxLength(30),Validators.required])],
      location: ['',Validators.compose([Validators.required],)],
      description: ['',Validators.compose([Validators.maxLength(100),Validators.required])],
      eventDate: ['',Validators.compose([Validators.required])],
      eventTime: ['',Validators.compose([Validators.required])],
      type: ['',Validators.compose([Validators.required])],
      crowd: ['',Validators.compose([Validators.required])],
      count: ['',Validators.compose([Validators.maxLength(30),Validators.required])],
      duration: ['',Validators.compose([Validators.required])],
    })
  }

  clickOnCreateEvent()
  {
    console.log("Clicked on Create Event");
    console.log(this.addEventForm.value);
    this.fireData.addEventToDatabase(this.addEventForm.value).then((data)=>{
      console.log('added to database');
    }).catch((err)=>{
      console.log(err);
    })
  }

}
