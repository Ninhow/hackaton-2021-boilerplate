import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Post } from '../services/Post.interface';
import { PostService } from '../services/post.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  formdata;
  post: Post;
  postId: string;

  constructor(private formBuilder: FormBuilder, private router:Router, private route:ActivatedRoute, private postService: PostService) {
  }

  onClickSubmit() {
    if(this.formdata.invalid) {
      this.formdata.get('description').markAsTouched();
    } else {
      console.log(this.formdata.value)
      this.post.answers.push(this.formdata.value)
    }
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))

      this.postService.getPostById(this.route.snapshot.paramMap.get('id')).subscribe((doc) => {
        this.post = doc.data()
        console.log(this.post )
      })
    this.formdata = this.formBuilder.group({
      description: ['', [Validators.required,
        Validators.maxLength(400), Validators.minLength(5)]]
    });
  }

}
