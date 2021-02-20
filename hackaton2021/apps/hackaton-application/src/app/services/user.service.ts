import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { flatMap, map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

import { AngularFireModule } from '@angular/fire';
import { User } from '../login/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  itemsCollection: AngularFirestoreCollection<User>;
  items: Observable<User[]>;
  constructor(
    public firebaseAuth: AngularFireAuth,
    private angularFire: AngularFirestore
  ) {
    this.items = this.angularFire.collection('users').valueChanges();
  }

  getItems() {
    return this.items;
  }

  getById(userId: string): Observable<User[]> {
    return this.angularFire
      .collection<User>('users', (ref) => ref.where('uid', '==', userId))
      .valueChanges()
      .pipe(map((items) => items));
  }
}

