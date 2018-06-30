import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument  } from 'angularfire2/firestore';
import { AngularFireAuth} from "angularfire2/auth";
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { delay , map , switchMap} from 'rxjs/operators';
import { firestore } from 'firebase';
import {User} from './models/users';
import { Router } from "@angular/router";
import { FirebaseApp, FirebaseAuth } from 'angularfire2';
import * as firebase from 'firebase/app';
import { CONSTANTS } from '@firebase/util';



@Injectable({
  providedIn: 'root'
})
export class UserService {


  usercollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  authState: Observable<firebase.User> = null;
  tempUser: User;
  userKey: string;

  constructor(public fs:AngularFirestore,
              private authfs:AngularFireAuth,
              private router:Router) { 
    
    this.usercollection = this.fs.collection('users');


   
    /*this.users = this.usercollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data ;
      }))
    );  */

    

  }

  signup(email: string, password: string) {
    
    this.authfs
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {

        this.authfs.authState.subscribe(auth=>{
          if(auth)
          {
            this.userKey = auth.uid;
            this.authState = this.authfs.authState;
            //console.log("PLEASE"+this.userKey);
          }
        })
        
        console.log('Success!', value);
        this.router.navigateByUrl('/user-homepage');

      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
       
        
      }); 
      
  

  }

  login(email: string, password: string) {
    this.authfs
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {

        this.authfs.authState.subscribe(auth=>{
          if(auth)
          {
            this.userKey = auth.uid;
            this.authState = this.authfs.authState;
            //console.log("PLEASE"+this.userKey);
          }
        })


        console.log('Nice, it worked WHATT THE FUCK!++');
        this.router.navigateByUrl('/user-homepage');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.authfs
      .auth
      .signOut();
      this.router.navigate(['/sign-in']);
      //this.router.navigateByUrl('/sign-in');
  }

  // Returns true if user is logged in
get authenticated(): boolean {
  return this.authState !== null;
}

get currentUserObservable(): any {
  return this.authfs.auth
}




  addUser(user: User)
  {
    //this.usercollection.add(user);
    this.usercollection.doc(this.userKey).set(this.tempUser);
  }




}
