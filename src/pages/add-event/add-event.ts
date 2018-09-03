import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder , Validators } from '@angular/forms';

import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
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
  event : { title?:string , description?:string , location?:string , date?:any} ={};
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder) {
    this.initilizeaddEventForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }


  initilizeaddEventForm()
  {
    this.addEventForm = this.formBuilder.group({
      title: ['',Validators.compose([Validators.required])],
      location: ['',Validators.compose([Validators.required],)],
      description: ['',Validators.compose([Validators.required])],
      date: ['',Validators.compose([Validators.required])],

    })
  }

}
