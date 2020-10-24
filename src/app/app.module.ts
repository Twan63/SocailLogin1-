import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//this is importing the Angular/fire to the module.ts file 
import {AngularFireModule } from '@angular/fire';

import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';

import {AngularFireStorageModule} from '@angular/fire/storage' ;

import{AngularFireAuthModule} from '@angular/fire/auth';
import { Component } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';

//these are the credentials for my firestore information
const config = 
{
  apiKey: "AIzaSyDjiseApWFFgqAgq2ZKZTL_-Rgg_UASvPA",
    authDomain: "sociallogin-bfa8f.firebaseapp.com",
    databaseURL: "https://sociallogin-bfa8f.firebaseio.com",
    projectId: "sociallogin-bfa8f",
    storageBucket: "sociallogin-bfa8f.appspot.com",
    messagingSenderId: "438261658477",
    appId: "1:438261658477:web:6bdbaff8d795e2bdfae064"

}

//Ask Terrance about this tomorrow 
// @Component(foobar)
// export class foobarComponent 
// {
//  constructor (private db: AngularFirestore)
//  {
//   const foobar = db.collection ('foobar').valueChanges();
//   foobar.subscribe(console.log);  
//  } 
// }

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    //initialize 
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, //firestore
    AngularFireAuthModule,//authorization
    AngularFireStorageModule, //storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// this is where you stopped at check terminal 
