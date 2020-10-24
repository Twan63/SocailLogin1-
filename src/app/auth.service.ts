import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user.model'; //optional for learning purposes


import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

import {config, Observable, of} from 'rxjs'; 
import {switchMap} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  user$ :  Observable<UserModel>;
  constructor(
    //Here we store the dependeces in the constructor
    private afAuth:AngularFireAuth,
    private afs: AngularFirestore, 
    private router: Router
  ) { 
    //this is going to get the auth state, then fetch the firesor user document or return null 
   
    this.user$ = this.afAuth.authState.pipe(
        switchMap(UserModel => {
          //logged in 
          if (UserModel)
          {
            //points to the document to go to the Usermodel.Id 
            return this.afs.doc<UserModel>(`users/${UserModel.uid}`).valueChanges();
          }else {
            //logged out
            return of(null);
                }
        })

      );
  }

  //this creates the google signin
  async googleSignIn()
  {
    const provider = new auth.GoogleAuthProvider(); 
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user)

  }
  
  async signOut()
  {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  private updateUserData({uid}: UserModel)
  {
  //this is taking the user info and mirros on the firestate document

    const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/${uid}`);

  }

  private updatingUser({uid,email,displayName,photoURL} : UserModel)
  {
    //sets user data to a firestore on login
    //once logged in the UserModel creditals are added to the database 
    const UserModelRef: AngularFirestoreDocument<UserModel> = this.afs.doc(`users/ ${uid}`);

    const UserData = 
    {
      uid : uid, 
      email: email,
      displayName: displayName, 
      photoURL: photoURL 
    }

    return UserModelRef.set(UserData, {merge:true})
  }

  
  
}