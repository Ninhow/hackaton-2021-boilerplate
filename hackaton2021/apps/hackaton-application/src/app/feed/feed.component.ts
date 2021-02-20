import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../services/Post.interface';
import { UserInfoService } from '../services/user-info.service';
import { UserService } from '../services/user.service';
import firebase from 'firebase';
import { User } from '../login/user.interface';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts: Post[];
  user: User;

  constructor(private postService: PostService, private userService: UserService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  goToPost(postId : string){
    console.log(postId)
    this.route.navigate(['dashboard/post', postId], {skipLocationChange:true});
  }
}



