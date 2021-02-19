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
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(
    public firebaseAuth: AngularFireAuth,
    private angularFire: AngularFirestore
  ) {
    this.items = this.angularFire.collection('items').valueChanges();
  }

  getItems() {
    return this.items;
  }

  getById(userId: string): Observable<Item[]> {
    return this.angularFire
      .collection<Item>('items', (ref) => ref.where('uid', '==', userId))
      .valueChanges()
      .pipe(map((items) => items));
  }
}

interface Item {
  uid?: string;
  id?: string;
  title?: string;
  description?: string;
}
