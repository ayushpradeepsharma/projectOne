import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import * as moment from 'moment';
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

}
