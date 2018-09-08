import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import * as moment from 'moment';
import * as _ from 'lodash';
import { GlobalsProvider } from '../globals/globals';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {


  constructor(public globals:GlobalsProvider) {
    console.log('Hello FirebaseProvider Provider');
  }

  signupUser(email: string, password: string, name: string, phoneNumber: number) {
		return new Promise((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {

        console.log("data output", email,name,phoneNumber);
        let createdAt= moment().format();
				firebase.database().ref('users').child(newUser.user.uid).set({
					id: newUser.user.uid,
					email: email,
					name: name,
					phoneNumber: phoneNumber,
					createdAt: createdAt,
				});
				resolve(newUser);
				this.globals.userId = newUser.user.uid;
			}).catch((error) => {
				console.log('Error getting location', error);
				reject(error);
				// });
			});

		});
	}

	loginUser(email:string,password:string)
	{
		return new Promise((resolve,reject)=>{
			firebase.auth().signInWithEmailAndPassword(email,password).then((data)=>{
				console.log(data);
				resolve(data);
			}).catch((err)=>{
				console.log(err);
				reject(err);
			})
		})
	}

	resetPassword(email:string)
	{
		return new Promise((resolve,reject)=>{
			firebase.auth().sendPasswordResetEmail(email).then((data)=>{
				console.log(data);
				resolve();
			}).catch((err)=>{
				console.log(err);
				reject(err);
			})
		})
	}

	addEventToDatabase(event:any)
	{
		return new Promise((resolve,reject)=>{
			var createdAt=moment().format();
			var dbRef=firebase.database().ref('AllEvents').push();
			var key=dbRef.key;
			var dbRefTwo=firebase.database().ref('AllEvents').child(key);
			dbRefTwo.set({
				event:event,
				key:key,
				createdBy:this.globals.userId,
				createdAt:createdAt,
			},()=>{
				resolve();
			}).catch((err)=>{
				console.log(err);
			})
		})
	}

	getEvents()
	{
		var eventsArr=[];
		return new Promise((resolve,reject)=>{
			var dbRef=firebase.database().ref('AllEvents');
			dbRef.on('value',(events)=>{
				eventsArr= _.toArray(events.val());
				console.log(eventsArr);
				resolve(eventsArr);
			})
		}).catch((err)=>{
			console.log(err);
		})
	}

	

}
