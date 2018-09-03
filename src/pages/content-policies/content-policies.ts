import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContentPoliciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-content-policies',
  templateUrl: 'content-policies.html',
})
export class ContentPoliciesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentPoliciesPage');
  }

  clickOnClose()
  {
    this.navCtrl.pop();
  }

}
