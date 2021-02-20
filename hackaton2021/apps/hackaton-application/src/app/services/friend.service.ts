import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { UserInfoService } from './user-info.service';
import { UserInfo } from '../login/user.info';
import validate = WebAssembly.validate;
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  userInfo: UserInfo;

  constructor(
    private store: AngularFirestore,
    private auth: AuthService,
    private info: UserInfoService
  ) {
    this.auth.userLoggedIn.subscribe((user) => {
      this.info
        .getUserInfoSub(user.uid)
        .subscribe((info) => (this.userInfo = info));
    });
  }

  findCommon(): Subject<LocatedFriends> {
    const ret = new Subject<LocatedFriends>();
    this.store
      .collection('userInfo')
      .get()
      .subscribe((resp) => {
        const close = resp.docs
          .filter((value) => {
            const data = value.data() as UserInfo;
            return (
              data.city.toLowerCase() === this.userInfo.city.toLowerCase() &&
              this.userInfo.tags.some((item) => data.tags.includes(item))
            );
          })
          .map((item) => {
            const data = item.data() as UserInfo;
            return data.userId;
          });

        const interest = resp.docs
          .filter((value) => {
            const data = value.data() as UserInfo;
            return (
              this.userInfo.tags.some((item) => data.tags.includes(item)) &&
              !close.includes(data.userId)
            );
          })
          .map((item) => {
            const data = item.data() as UserInfo;
            return data.userId;
          });
        close.splice(close.indexOf(this.userInfo.userId), 1);
        const temp: LocatedFriends = {
          close: close,
          similar: interest,
        };

        ret.next(temp);
      });

    return ret;
  }

  sendFriendRequest(friendId: string, uid: string): void {
    const request: FriendRequest = {
      accepted: false,
      declined: false,
      friendId: friendId,
      uid: uid,
    };

    this.store
      .collection<FriendRequest>('friendRequests')
      .get()
      .pipe(take(1))
      .subscribe((resp) => {
        const exist = resp.docs
          .map((item) => item.data() as FriendRequest)
          .includes(request);
        if (!exist) {
          this.store.collection('friendRequests').add(request);
        }
      });
  }

  getFriendRequests(): Subject<FriendRequest[]> {
    const ret: Subject<FriendRequest[]> = new Subject<FriendRequest[]>();

    this.store
      .collection<FriendRequest>('friendRequests', (ref) =>
        ref.where('friendId', '==', this.userInfo.userId)
      )
      .valueChanges({ idField: 'id' })
      .subscribe((coll) => {
        console.log(coll);
        ret.next(coll);
      });

    return ret;
  }

  respondToRequest(resp: 'accept' | 'decline', req: FriendRequest): void {
    if (resp === 'accept') {
      console.log(req);
      this.info.addFriend(req.friendId, req.uid);
      this.store.collection('friendRequests').doc(req.id).delete();
    } else if (resp === 'decline') {
      this.store.collection('friendRequests').doc(req.id).delete();
    }
  }

  getFriends(): Subject<string[]> {
    const ret = new Subject<string[]>();

    this.store
      .collection<UserInfo>('userInfo', (ref) =>
        ref.where('userId', '==', this.userInfo.userId)
      )
      .valueChanges({ idField: 'id' })
      .subscribe((value) => {
        ret.next(value[0].friends);
      });

    return ret;
  }
}

export interface LocatedFriends {
  close: string[];
  similar: string[];
}

export interface FriendRequest {
  id?: string;
  uid: string;
  friendId: string;
  accepted: boolean;
  declined: boolean;
}
