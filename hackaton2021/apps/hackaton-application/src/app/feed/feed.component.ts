import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  posts: any[] = [
    {
      "postTitle": "test title 1",
      "postTags": [{name: "Test tag 1", icon: "person"}, {name: "Test tag 2", icon: "feed"}],
      "postUser": "test user 1",
      "postDescription": "BruvKek BruvKek BruvKek BruvKek BruvKek BruvKek BruvKek BruvKek BruvKek"
    },
    {
      "postTitle": "test title 2",
      "postTags": [{name: "Test tag 1", icon: "person"}, {name: "Test tag 2", icon: "feed"}],
      "postUser": "test user 2",
      "postDescription": "Kekbruv Kekbruv Kekbruv Kekbruv Kekbruv Kekbruv Kekbruv Kekbruv Kekbruv"
    },
    {
      "postTitle": "test title 3",
      "postTags": [{name: "Test tag 1", icon: "person"}, {name: "Test tag 2", icon: "feed"}],
      "postUser": "test user 3",
      "postDescription": "Bruv Bruv Bruv Bruv Bruv Bruv Bruv Bruv Bruv Bruv Bruv Bruv Bruv Bruv Bruv"
    },
    {
      "postTitle": "test title 4",
      "postTags": [{name: "Test tag 1", icon: "person"}, {name: "Test tag 2", icon: "feed"}],
      "postUser": "test user 4",
      "postDescription": "Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek Kek"
    },
  ];
}
