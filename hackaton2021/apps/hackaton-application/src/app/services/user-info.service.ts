import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserInfo } from '../login/user.info';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase';
import { take } from 'rxjs/operators';
import { User } from '../login/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(public auth: AuthService, private store: AngularFirestore) {}

  getUserInfoSub(uid: string): Subject<UserInfo> {
    const info: Subject<UserInfo> = new Subject<UserInfo>();
    this.store
      .collection<UserInfo>('userInfo', (ref) =>
        ref.where('userId', '==', this.auth.userData.uid)
      )
      .valueChanges()
      .subscribe((arr) => info.next(arr[0]));
    return info;
  }

  createUserInfo(tags: string[], city: string, uid: string): void {
    const userInfo: UserInfo = {
      city: city,
      tags: tags,
      friends: [],
      stared: [],
      likes: 0,
      userId: this.auth.userData.uid,
    };

    this.store.collection('userInfo').add(userInfo);
  }

  private getUserInfo(
    uid: string
  ): Observable<firebase.firestore.QuerySnapshot<UserInfo>> {
    return this.store
      .collection<UserInfo>('userInfo', (ref) =>
        ref.where('userId', '==', this.auth.userData.uid)
      )
      .get();
  }

  addFriend(friendID: string, uid: string): void {
    this.store
      .collection('userInfo')
      .get()
      .subscribe((resp) => {
        const users = resp.docs
          .map((resp) => {
            const user = resp.data() as UserInfo;
            user.id = resp.id;
            return user;
          })
          .filter((value) => {
            return value.userId === friendID || value.userId === uid;
          });
        users.forEach((val) => {
          if (friendID == val.userId) {
            val.friends.push(uid);
            this.store.collection('userInfo').doc(val.id).update(val);
          } else {
            val.friends.push(friendID);
            this.store.collection('userInfo').doc(val.id).update(val);
          }
        });
      });
  }

  addTagg(taggId: string, uid: string): void {
    this.getUserInfo(uid).subscribe((resp) => {
      if (resp.empty) {
        alert('No user info in database');
      } else {
        const info = this.constructUserData(resp);
        info.friends.push(taggId);
        this.store.collection('userInfo').doc(info.id).update(info);
      }
    });
  }

  changeCity(city: string, uid: string) {
    this.getUserInfo(uid).subscribe((resp) => {
      if (resp.empty) {
        alert('No user info in database');
      } else {
        const info = this.constructUserData(resp);
        info.city = city;
        this.store.collection('userInfo').doc(info.id).update(info);
      }
    });
  }

  private constructUserData(input: QuerySnapshot<UserInfo>): UserInfo {
    const data = input.docs[0].data() as UserInfo;
    data.id = input.docs[0].id;
    return data;
  }

  updateLikes(likes: number, uid: string): void {
    this.getUserInfo(uid).subscribe((resp) => {
      if (resp.empty) {
        alert('No user info in database');
      } else {
        const data = this.constructUserData(resp);
        data.likes = likes;
        this.store.collection('userInfo').doc(data.id).update(data);
      }
    });
  }

  addStarred(starredUserId: string, uid: string): void {
    this.getUserInfo(uid).subscribe((reps) => {
      if (reps.empty) {
        alert('No user info in database');
      } else {
        const data = this.constructUserData(reps);
        data.stared.push(starredUserId);
        this.store.collection('userInfo').doc(data.id).update(data);
      }
    });
  }

  getUsernameById(id: string): Subject<string> {
    const ret = new Subject<string>();
    this.store
      .collection<User>('users')
      .doc(id)
      .get()
      .subscribe((somethinh) => {
        console.log(somethinh.data());
        ret.next(somethinh.data().displayName);
      });
    return ret;
  }
}
