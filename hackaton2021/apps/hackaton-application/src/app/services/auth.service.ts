import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';

import { AngularFireModule } from '@angular/fire';
import { User } from '../login/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: User = null;
  public userLoggedIn: Subject<User> = new Subject<User>();

  //loggedIn: boolean = false;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private angularFire: AngularFirestore,
    private router: Router
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      console.log('STATE KÖRS');
      if (user) {
        this.SetUserData(user);
        this.userLoggedIn.next(this.userData);
        this.angularFire.collection('users').doc(user.uid).set(this.userData);
        console.log('Användaren inloggad.');

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signin(email: string, password: string): Promise<any> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.SetUserData(response.user);
      });
  }

  updateUsername(name: string): void {
    this.firebaseAuth.authState.subscribe((user) => {
      user.updateProfile({ displayName: name });
      this.userData.displayName = name;
      this.angularFire
        .collection('users')
        .doc(this.userData.uid)
        .update(this.userData);
    });
  }

  SetUserData(user) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    //localStorage.setItem('user', JSON.stringify(userData));
    this.userData = userData;
    this.userLoggedIn.next(this.userData);
  }

  logout() {
    localStorage.removeItem('user');
    return this.firebaseAuth.signOut();
  }

  GetUser() {
    return this.userData;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) !== false ? true : false;
  }
}
