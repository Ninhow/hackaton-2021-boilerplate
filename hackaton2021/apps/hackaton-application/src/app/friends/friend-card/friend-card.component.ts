import { Component, Input, OnInit } from '@angular/core';
import { Friends } from '../friends.component';

@Component({
  selector: 'friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css'],
})
export class FriendCardComponent implements OnInit {
  @Input() f: Friends;

  constructor() {}

  ngOnInit(): void {}
}
