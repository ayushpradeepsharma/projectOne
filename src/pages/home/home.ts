import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GlobalsProvider } from '../../providers/globals/globals';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items :any =[];
  events :any;
  constructor(public navCtrl: NavController,public fireData:FirebaseProvider,public globals:GlobalsProvider) {
    this.fetchEvents();
    
  }

  initialize()
  {
    for(let i=0;i<20;i++)
    {
      this.items.push(this.events[this.items.length]);
    }
    console.log(this.items);
  }

  fetchEvents()
  {
    console.log("In fetch events page");
    this.fireData.getEvents().then((data)=>{
      console.log(data);
      this.events=data;
      this.initialize();
    }).catch((err)=>{
      console.log(err);
    })
  }

  loadContents(infiniteScroll) {
    console.log('In infinite scroll');
    console.log(this.items);
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        this.items.push( this.events[this.items.length] );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 3500);
  }


  

}
