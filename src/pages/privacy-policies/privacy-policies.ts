import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrivacyPoliciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy-policies',
  templateUrl: 'privacy-policies.html',
})
export class PrivacyPoliciesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPoliciesPage');
  }

  clickOnClose()
  {
    this.navCtrl.pop();
  }

}
