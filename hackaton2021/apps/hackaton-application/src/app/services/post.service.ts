import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

import { AngularFireModule } from '@angular/fire';
import { User } from '../login/user.interface';
import { Router } from '@angular/router';
import { Post} from './Post.interface';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  constructor(
    public firebaseAuth: AngularFireAuth,
    private angularFire: AngularFirestore
  ) {
    this.posts = this.angularFire.collection('posts').valueChanges({idField:'id'});
  }

  getPosts() {
    return this.posts;
  }

  getPostByUserId(userId: string){
    return this.angularFire
      .collection<Post>('posts', (ref) => ref.where('uid', '==', userId))
      .valueChanges()
      .pipe(map((items) => items));
  }

  getPostById(id: string){
    return this.angularFire
      .collection<Post>('posts', ).doc(id).get()
  }
}

interface Item {
  uid?: string;
  id?: string;
  title?: string;
  description?: string;
}
